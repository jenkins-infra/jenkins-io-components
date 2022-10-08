import {WeatherIcon} from '../jio-weather-icon.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-weather-icon', () => {
  test('shows sunny by default', async () => {
    const el = (await fixture(html`<jio-weather-icon></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "Sunny Weather Icon");
  });
  test('handles title', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='sunny' title="something else"></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "something else");
  });
  test('explicit - sunny', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='sunny'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "Sunny Weather Icon");
  });
  test('explicit - storm', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='storm'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "Stormy Weather Icon");
  });
  test('explicit - cloudy', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='cloudy'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
    assert.equal(el.shadowRoot?.querySelector('svg title')?.textContent, "Cloudy Weather Icon");
  });
});


