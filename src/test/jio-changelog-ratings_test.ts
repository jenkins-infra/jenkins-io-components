import {ChangelogRatings} from '../jio-changelog-ratings.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-changelog-ratings', () => {
  test('renders properly by default', async () => {
    const el = (await fixture(html`<jio-changelog-ratings></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
      <div class="rate-outer">
  <div class="rate-offset">
    <span
      data-direction="good"
      role="button"
      tabindex="1"
    >
      <jio-changelog-weather-icon
        count="0"
        mode="sunny"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="nolike"
      role="button"
      tabindex="2"
    >
      <jio-changelog-weather-icon
        count="0"
        mode="cloudy"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="rollback"
      role="button"
      tabindex="3"
    >
      <jio-changelog-weather-icon
        count="0"
        mode="storm"
      >
      </jio-changelog-weather-icon>
    </span>
  </div>
</div>
    `);
  });
  test('renders properly with counts', async () => {
    const el = (await fixture(html`<jio-changelog-ratings good="100" nolike="5" rollback="7"></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
      <div class="rate-outer">
  <div class="rate-offset">
    <span
      data-direction="good"
      role="button"
      tabindex="1"
    >
      <jio-changelog-weather-icon
        count="100"
        mode="sunny"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="nolike"
      role="button"
      tabindex="2"
    >
      <jio-changelog-weather-icon
        count="5"
        mode="cloudy"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="rollback"
      role="button"
      tabindex="3"
    >
      <jio-changelog-weather-icon
        count="7"
        mode="storm"
      >
      </jio-changelog-weather-icon>
    </span>
  </div>
</div>
    `);
  });
  test('renders highlighted issues', async () => {
    const el = (await fixture(html`<jio-changelog-ratings good="100" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
      <div class="rate-outer">
  <div class="rate-offset">
    <span
      data-direction="good"
      role="button"
      tabindex="1"
    >
      <jio-changelog-weather-icon
        count="100"
        mode="sunny"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="nolike"
      role="button"
      tabindex="2"
    >
      <jio-changelog-weather-icon
        count="5"
        mode="cloudy"
      >
      </jio-changelog-weather-icon>
    </span>
    <span
      data-direction="rollback"
      role="button"
      tabindex="3"
    >
      <jio-changelog-weather-icon
        count="7"
        mode="storm"
      >
      </jio-changelog-weather-icon>
    </span>
    <span class="related-issues">
      Community reported issues:
      <span>
        5×
        <a href="https://issues.jenkins.io/browse/JENKINS-61990">
          JENKINS-61990
        </a>
      </span>
      <span>
        1×
        <a href="https://issues.jenkins.io/browse/JENKINS-63232">
          JENKINS-63232
        </a>
      </span>
      <span>
        1×
        <a href="https://issues.jenkins.io/browse/JENKINS-63506">
          JENKINS-63506
        </a>
      </span>
    </span>
  </div>
</div>
    `);
  });
});
