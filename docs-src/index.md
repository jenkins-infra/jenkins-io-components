---
layout: page.11ty.cjs
title: Jenkins.io Components ⌲ Home
---

# Jenkins.io Web Components


So many web components for jenkins.io to use. All of these are just HTML elements.
You can it anywhere you can use HTML!

## &lt;jio-improve-this-page>

`<jio-improve-this-page>` links to github's edit file screen

### HTML

<section class="columns">
  <div>

```html
<jio-improve-this-page
  sourcePath="docs-src/index.md"
  githubRepo="halkeye/jenkins-io-components"
></jio-improve-this-page>
```

  </div>
  <div>

<jio-improve-this-page sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-improve-this-page>

  </div>
</section>

## &lt;jio-report-a-problem>

`<jio-report-a-problem>` links to github's edit file screen

### HTML

<section class="columns">
  <div>

```html
<jio-report-a-problem
  sourcePath="docs-src/index.md"
  githubRepo="halkeye/jenkins-io-components"
></jio-report-a-problem>
```

  </div>
  <div>

<jio-report-a-problem sourcePath="docs-src/index.md" githubRepo="halkeye/jenkins-io-components"></jio-report-a-problem>

  </div>
</section>

## &lt;jio-changelog-ratings>

`<jio-changelog-ratings>` shows the community feeling about a given release

### HTML

<section class="columns">
  <div>

```html
<jio-changelog-ratings
  good="100"
  nolike="5"
  rollback="7"
  ratings='["63232",1,"63506",1,"61990",5]'
></jio-changelog-ratings>
```

  </div>
  <div>

<jio-changelog-ratings good="100" nolike="5" rollback="7" ratings='["63232",1,"63506",1,"61990",5]'></jio-changelog-ratings>

  </div>
</section>

## &lt;jio-changelog-weather-icon>

`<jio-changelog-weather-icon>` shows a count, icon, and title based on if the release was liked or not

### HTML

<section class="columns">
  <div>

```html
<jio-changelog-weather-icon
  mode='sunny'
  count="10"
></jio-report-a-problem>
```

  </div>
  <div>

<jio-changelog-weather-icon mode='sunny' count="10" ></jio-report-a-problem>

  </div>
</section>

## &lt;jio-weather-icon>

`<jio-weather-icon>` shows one of the weather icons

### HTML

<section class="columns">
  <div>

```html
<jio-weather-icon weather="sunny"></jio-weather-icon>
<jio-weather-icon weather="cloudy"></jio-weather-icon>
<jio-weather-icon weather="storm"></jio-weather-icon>
```

  </div>
  <div>

<jio-weather-icon weather="sunny"></jio-weather-icon>
<jio-weather-icon weather="cloudy"></jio-weather-icon>
<jio-weather-icon weather="storm"></jio-weather-icon>

  </div>
</section>

## &lt;jio-socialmedia-buttons>

`<jio-socialmedia-buttons>` shows social media icons and links to them

### HTML

<section class="columns">
  <div>

```html
<jio-socialmedia-buttons
  github="halkeye"
  linkedin="halkeye"
  twitter="halkeye"
  blog='https://g4v.dev'
></jio-socialmedia-buttons>
```

  </div>
  <div>

<jio-socialmedia-buttons github="halkeye" linkedin="halkeye" twitter="halkeye" blog='https://g4v.dev'></jio-socialmedia-buttons>

  </div>
</section>

## &lt;jio-datetime-box>

`<jio-datetime-box>` shows a box with a start and optional end time

### HTML

<section class="columns">
  <div>

```html
<jio-datetime-box
  date="2022-10-01T00:00:00"
  endDate="2022-10-31T00:00:00"
></jio-datetime-box>
```

  </div>
  <div>

<jio-datetime-box date="2022-10-01T00:00:00" endDate="2022-10-31T00:00:00"></jio-datetime-box>

  </div>
</section>

## &lt;jio-datetime-box>

`<jio-navbar>` shows the standard jenkins navbar

* Note should really be fixed to the top of the page, or at least the width of the page

### HTML

<section>

  <div>

```html
<style>
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
</style>

<jio-navbar class="fixed-top"></jio-navbar>
```

  </div>
  <div>

<jio-navbar></jio-navbar>

  </div>
</section>
