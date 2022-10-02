---
layout: example.11ty.cjs
title: Jenkins.io Components ⌲ Examples ⌲ Declarative Rendering
tags: example
description: Declarative Rendering
name: Declarative Rendering
---

`<jio-improve-this-page>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

<h2>This is a &lt;jio-improve-this-page&gt;</h2>
<jio-improve-this-page sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-improve-this-page>

<h3>JS</h3>

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
