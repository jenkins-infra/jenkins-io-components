---
layout: page.11ty.cjs
title: Jenkins.io Components ⌲ Home
---

# Jenkins.io Web Components


So many web components for jenkins.io to use

## &lt;jio-improve-this-page>

`<jio-improve-this-page>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

### As easy as HTML

<section class="columns">
  <div>

`<jio-improve-this-page>` is just an HTML element. You can it anywhere you can use HTML!

```html
<jio-improve-this-page sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-improve-this-page>
```

  </div>
  <div>

<jio-improve-this-page sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-improve-this-page>

  </div>
</section>

### Declarative rendering

<section class="columns">
  <div>

`<jio-improve-this-page>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const githubRepo = 'halkeye/jenkins-io-components';
const sourcePath = 'docs-src/index.md';

render(
  html`
    <h2>This is a &lt;jio-improve-this-page&gt;</h2>
    <jio-improve-this-page .sourcePath="${sourcePath}" .githubRepo="${githubRepo}"></jio-improve-this-page>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;jio-improve-this-page&gt;</h2>
<jio-improve-this-page sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-improve-this-page>

  </div>
</section>
