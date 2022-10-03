import {ChangelogWeatherIcon} from '../jio-changelog-weather-icon.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-changelog-weather-icon', () => {
  test('shows sunny by default', async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        0
        <span class="light">
          <jio-weather-icon title="No major issues with this release" weather="sunny"></jio-weather-icon>
        </span>
      </span>
    `);
  });
  test(`sunny - 0 - should be faded (light class)`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon mode="sunny"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        0
        <span class="light">
          <jio-weather-icon title="No major issues with this release" weather="sunny"></jio-weather-icon>
        </span>
      </span>
    `);
  });
  test(`cloudy - 0 - should be faded (light class)`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon mode="cloudy"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        0
        <span class="light">
          <jio-weather-icon title="I experienced notable issues" weather="cloudy"></jio-weather-icon>
        </span>
      </span>
    `);
  });
  test(`storm - 0 - should be faded (light class)`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon mode="storm"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        0
        <span class="light">
          <jio-weather-icon title="I had to roll back" weather="storm"></jio-weather-icon>
        </span>
      </span>
    `);
  });

  test(`sunny - 15 - should show light`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon count="15" mode="sunny"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        15
        <span>
          <jio-weather-icon title="No major issues with this release" weather="sunny"></jio-weather-icon>
        </span>
      </span>
    `);
  });
  test(`cloudy - 15 - should show light`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon count="15" mode="cloudy"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        15
        <span>
          <jio-weather-icon title="I experienced notable issues" weather="cloudy"></jio-weather-icon>
        </span>
      </span>
    `);
  });
  test(`storm - 15 - should be normal`, async () => {
    const el = (await fixture(html`<jio-changelog-weather-icon count="15" mode="storm"></jio-changelog-weather-icon>`)) as ChangelogWeatherIcon;
    assert.instanceOf(el, ChangelogWeatherIcon);
    assert.shadowDom.equal(el,
      `<span>
        15
        <span>
          <jio-weather-icon title="I had to roll back" weather="storm"></jio-weather-icon>
        </span>
      </span>
    `);
  });
});



