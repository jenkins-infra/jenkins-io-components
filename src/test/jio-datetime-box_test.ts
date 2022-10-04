import {DatetimeBox} from '../jio-datetime-box.js';

import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-datetime-box', () => {
  suite('default variables', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-datetime-box></jio-datetime-box>`)) as DatetimeBox;
      assert.instanceOf(el, DatetimeBox);
      assert.shadowDom.equal(el, ``);
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-datetime-box></jio-datetime-box>`)) as DatetimeBox;
      return assert.isAccessible(el);
    });
  });
  suite('no end date', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-datetime-box date="2022-10-01T00:00:00Z"></jio-datetime-box>`)) as DatetimeBox;
      assert.instanceOf(el, DatetimeBox);
      assert.shadowDom.equal(
        el,
        `
        <div class="date-time">
          <div class="date">
            <time datetime="2022-10-01T00:00:00.000Z" title="Start Time">
              <span class="month">Oct</span><span class="day">01</span>
            </time>
          </div>
          <div class="time">01:01 AM</div>
          <div class="dow">Sun</div>
        </div>
        `
      );
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-datetime-box date="2022-10-01T00:00:00"></jio-datetime-box>`)) as DatetimeBox;
      return assert.isAccessible(el);
    });
  });
  suite('all parameters', async () => {
    test('renders properly by default', async () => {
      const el = (await fixture(html`<jio-datetime-box date="2022-10-01T00:00:00Z" endDate="2022-10-31T23:59:59Z"></jio-datetime-box>`)) as DatetimeBox;
      assert.instanceOf(el, DatetimeBox);
      assert.shadowDom.equal(
        el,
        `
        <div class="date-time">
          <div class="date">
            <time datetime="2022-10-01T00:00:00.000Z" title="Start Time">
              <span class="month">Oct</span><span class="day">01</span>
            </time>
            -
            <time datetime="2022-10-31T23:59:59.000Z" title="End Time">
              <span class="month">Oct</span><span class="day">31</span>
            </time>
          </div>
          <div class="time">01:01 AM</div>
          <div class="dow">Sun</div>
        </div>
        `
      );
    });
    test('is accessible', async () => {
      const el = (await fixture(html`<jio-datetime-box date="2022-10-01T00:00:00" endDate="2022-10-31T00:00:00"></jio-datetime-box>`)) as DatetimeBox;
      return assert.isAccessible(el);
    });
  });
});


