const header = require('./header.11ty.cjs');
const footer = require('./footer.11ty.cjs');
const nav = require('./nav.11ty.cjs');
const relative = require('./relative-path.cjs');

module.exports = function (data) {
  const {title, page, content} = data;
  return `
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="${relative(page.url, '/docs.css')}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Roboto+Mono">
    <link href="${relative(page.url, '/prism-okaidia.css')}" rel="stylesheet" />
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-loader.js"></script>
    <script src="https://unpkg.com/lit@2.4.0/polyfill-support.js"></script>
    <script type="module" src="${relative(page.url, '/jio-components.ejs.js')}"></script>
    <script data='ionicons' src='https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.esm.js' type='module'></script>
    <script data='ionicons' nomodule='' src='https://cdnjs.cloudflare.com/ajax/libs/ionicons/5.5.2/ionicons/ionicons.js'></script>
    <style>
      footer jio-report-a-problem {
        --jio-a-color: white;
      }
    </style>
  </head>
  <body>
    ${header(data)}
    ${nav(data)}
    <div id="main-wrapper">
      <main>
        ${content}
      </main>
    </div>
    ${footer(data)}
  </body>
</html>`;
};
