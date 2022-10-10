import {ChangelogRatings} from '../jio-changelog-ratings.js';

import sinon from 'sinon';
import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('jio-changelog-ratings', () => {
  test('renders properly by default', async () => {
    const el = (await fixture(html`<jio-changelog-ratings></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
  <div>
    <span
      data-direction="good"
      role="button"
      tabindex="0"
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
      tabindex="0"
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
      tabindex="0"
    >
      <jio-changelog-weather-icon
        count="0"
        mode="storm"
      >
      </jio-changelog-weather-icon>
    </span>
  </div>
    `);
  });
  test('renders properly with counts', async () => {
    const el = (await fixture(html`<jio-changelog-ratings good="100" nolike="5" rollback="7"></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
  <div>
    <span
      data-direction="good"
      role="button"
      tabindex="0"
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
      tabindex="0"
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
      tabindex="0"
    >
      <jio-changelog-weather-icon
        count="7"
        mode="storm"
      >
      </jio-changelog-weather-icon>
    </span>
  </div>
    `);
  });
  test('renders highlighted issues', async () => {
    const el = (await fixture(html`<jio-changelog-ratings good="100" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);
    assert.shadowDom.equal(el,
      `
  <div>
    <span
      data-direction="good"
      role="button"
      tabindex="0"
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
      tabindex="0"
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
      tabindex="0"
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
    `);
  });
  test('is accessible', async () => {
    const el = (await fixture(html`<jio-changelog-ratings good="100" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
    return assert.isAccessible(el);
  });
  test('triggers event when good without asking for issue ', async () => {
    const promptFake = sinon.stub();

    const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
    assert.instanceOf(el, ChangelogRatings);

    el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
    el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

    const listener = oneEvent(el, 'changelog-ratings-rated');
    (el.shadowRoot?.querySelector('[data-direction="good"]') as HTMLElement).click();

    const {detail} = await listener;

    assert.isFalse(promptFake.called);
    assert.deepEqual(detail, {version: "0.1.2", rating: 1, issue: undefined});
  });

  suite('clicked nolike', async () => {
    test('events event with no issue ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('');
      promptFake.onCall(1).returns('');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="nolike"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.deepEqual(detail, {version: "0.1.2", rating: 0, issue: ''});
    });

    test('events event is selected with confirm no issue, then issue ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('');
      promptFake.onCall(1).returns('JENKINS-123');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="nolike"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.deepEqual(detail, {version: "0.1.2", rating: 0, issue: 'JENKINS-123'});
    });

    test('events event is selected with issue right away ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('JENKINS-123');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" nolike="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="nolike"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.isTrue(promptFake.called);
      assert.deepEqual(detail, {version: "0.1.2", rating: 0, issue: 'JENKINS-123'});
    });
  });

  suite('clicked rollback', async () => {
    test('events event with no issue ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('');
      promptFake.onCall(1).returns('');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" rollback="5" nolink="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="rollback"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.deepEqual(detail, {version: "0.1.2", rating: -1, issue: ''});
    });

    test('events event is selected with confirm no issue, then issue ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('');
      promptFake.onCall(1).returns('JENKINS-123');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" nolink="5" rollback="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="rollback"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.deepEqual(detail, {version: "0.1.2", rating: -1, issue: 'JENKINS-123'});
    });

    test('events event is selected with issue right away ', async () => {
      const promptFake = sinon.stub();
      promptFake.onCall(0).returns('JENKINS-123');

      const el = (await fixture(html`<jio-changelog-ratings version="0.1.2" good="101" rollback="5" nolink="7" .ratings=${["63232", 1, "63506", 1, "61990", 5]} ></jio-changelog-ratings>`)) as ChangelogRatings;
      assert.instanceOf(el, ChangelogRatings);

      el.addEventListener('changelog-ratings-canceled', () => {throw new Error('canceled');});
      el['_prompt'] = promptFake; // ugly hack to not block waiting for browser to prompt. Override the private wrapper function

      const listener = oneEvent(el, 'changelog-ratings-rated');
      (el.shadowRoot?.querySelector('[data-direction="rollback"]') as HTMLElement).click();

      const {detail} = await listener;
      assert.isTrue(promptFake.called);
      assert.deepEqual(detail, {version: "0.1.2", rating: -1, issue: 'JENKINS-123'});
    });
  });
});
