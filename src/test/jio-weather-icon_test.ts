import {WeatherIcon} from '../jio-weather-icon.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-weather-icon', () => {
  test('shows sunny by default', async () => {
    const el = (await fixture(html`<jio-weather-icon></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.shadowDom.equal(el, `<span title="Sunny Weather Icon"></span>`);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
  });
  test('handles title', async () => {
    const el = (await fixture(html`<jio-weather-icon title="something else"></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.shadowDom.equal(el, `<span title="something else"></span>`);
  });
  test('explicit - sunny', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='sunny'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.shadowDom.equal(el, `<span title="Sunny Weather Icon"></span>`);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
  });
  test('explicit - storm', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='storm'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.shadowDom.equal(el, `<span title="Stormy Weather Icon"></span>`);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
  });
  test('explicit - cloudy', async () => {
    const el = (await fixture(html`<jio-weather-icon weather='cloudy'></jio-weather-icon>`)) as WeatherIcon;
    assert.instanceOf(el, WeatherIcon);
    assert.shadowDom.equal(el, `<span title="Cloudy Weather Icon"></span>`);
    assert.instanceOf(el.shadowRoot?.querySelector('svg'), SVGSVGElement);
  });
});


