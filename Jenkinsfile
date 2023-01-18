pipeline {
  options {
    timeout(time: 60, unit: 'MINUTES')
    ansiColor('xterm')
    disableConcurrentBuilds(abortPrevious: true)
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '5')
  }

  agent {
    label 'node'
  }

  environment {
    NODE_ENV = 'production'
    TZ = "UTC"
  }

  stages {
    stage('Check for typos') {
      steps {
        sh '''
          curl -qsL https://github.com/crate-ci/typos/releases/download/v1.13.7/typos-v1.13.7-x86_64-unknown-linux-musl.tar.gz | tar xvzf - ./typos
          curl -qsL https://github.com/halkeye/typos-json-to-checkstyle/releases/download/v0.1.1/typos-checkstyle-v0.1.1-x86_64 > typos-checkstyle && chmod 0755 typos-checkstyle
          ./typos --format json | ./typos-checkstyle - > checkstyle.xml || true
        '''
      }
      post {
        always {
          recordIssues(tools: [checkStyle(id: 'typos', name: 'Typos', pattern: 'checkstyle.xml')])
        }
      }
    }

    stage('Install Dependencies') {
      environment {
        NODE_ENV = 'development'
      }
      steps {
        sh 'npm ci'
        sh 'npx playwright install'
      }
    }

    stage('Lint') {
      environment {
        NODE_ENV = "development"
      }
      steps {
        sh '''
          npx eslint --format checkstyle . > eslint-results.json
          npx stylelint --custom-formatter ./node_modules/stylelint-checkstyle-formatter src/**/*.css -o stylelint-results.json
        '''
      }
      post {
        always {
          recordIssues(tools: [
              esLint(pattern: 'eslint-results.json'),
              styleLint(pattern: 'stylelint-results.json')
          ])
        }
      }
    }

    stage('Build') {
      steps {
        sh '''
          npm run build --if-present
          npm run build-storybook
        '''
      }
    }

    stage('Prep storybook for testing') {
      steps {
        sh 'npx http-server -p 6321 storybook-static &'
        sh 'npx wait-on -v http://127.0.0.1:6321'
      }
    }

    stage('Test') {
      environment {
        TARGET_URL = "http://127.0.0.1:6321"
      }
      steps {
        sh '''
          npx test-storybook --maxWorkers=2 --coverage --junit --ci
        '''
      }
      post {
        always {
          junit('junit.xml')
        }
      }
    }

    stage('Coverage') {
      // cobertura seems broken on infra, and we don't need to publish it from there
      when { not { expression { infra.isInfra() } } }
      steps {
        sh 'npx nyc report --reporter=cobertura -t coverage/storybook --report-dir coverage/storybook'
      }
      post {
        always {
          publishCoverage adapters: [cobertura('coverage/storybook/cobertura-coverage.xml')], checksName: 'coverage', sourceFileResolver: sourceFiles('NEVER_STORE')
        }
      }
    }


    stage('Deploy PR to preview site') {
      when {
        allOf{
          changeRequest target: 'main'
          // Only deploy to production from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=true --siteName "jenkins-io-components" --title "Preview deploy for ${CHANGE_ID}" --alias "deploy-preview-${CHANGE_ID}" -d ./storybook-static'
      }
      post {
        success {
          recordDeployment('jenkins-infra', 'jenkins-io-components', pullRequest.head, 'success', "https://deploy-preview-${CHANGE_ID}--jenkins-io-components.netlify.app")
        }
        failure {
          recordDeployment('jenkins-infra', 'jenkins-io-components', pullRequest.head, 'failure', "https://deploy-preview-${CHANGE_ID}--jenkins-io-components.netlify.app")
        }
      }
    }

    stage('Deploy Production') {
      when {
        allOf {
          branch "main"
          // Only deploy to production from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-auth-token')
      }
      steps {
        sh 'netlify-deploy --draft=false --siteName "jenkins-io-components" --title "Deploy" -d ./storybook-static'
      }
      post {
        success {
          recordDeployment('jenkins-infra', 'jenkins-io-components', env.GIT_COMMIT, 'success', 'https://jenkins-io-components.netlify.app', [environment: 'production'])
        }
        failure {
          recordDeployment('jenkins-infra', 'jenkins-io-components', env.GIT_COMMIT, 'failure', 'https://jenkins-io-components.netlify.app', [environment: 'production'])
        }
      }
    }

    stage('Release') {
      when {
        allOf {
          branch "main"
          // Only deploy to production from infra.ci.jenkins.io
          expression { infra.isInfra() }
        }
      }
      environment {
        NPM_TOKEN = credentials('jenkinsci-npm-token')
      }
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'jenkins-io-components-ghapp',
                usernameVariable: 'GITHUB_APP',
                passwordVariable: 'GITHUB_TOKEN')]) {
            sh 'npx semantic-release'
          }
        }
      }
    }
  }
}
