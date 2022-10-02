module.exports = function (data) {
  return `
<footer>
  <jio-report-a-problem sourcePath="${data.page.inputPath}" githubRepo="halkeye/jenkins-io-components"></jio-report-a-problem>
  <p>
    Made with
    <a href="https://github.com/lit/lit-element-starter-ts">lit-starter-ts</a>
  </p>
</footer>`;
};
