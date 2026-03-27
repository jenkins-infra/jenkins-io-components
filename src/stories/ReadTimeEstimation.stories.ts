import {StoryObj, Meta} from '@storybook/web-components';
import {html} from 'lit';
import {expect} from '@storybook/jest';

import {ReadTimeEstimation} from '../jio-read-time';
import '../jio-read-time';

const shortContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const mediumContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.';

const longContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod sit amet dui nec congue. Nunc magna nisl, pharetra pharetra laoreet id, semper at ipsum. Pellentesque et lorem imperdiet, iaculis purus sed, elementum est. Curabitur pulvinar nibh ac velit aliquet, eu dapibus velit interdum. Aliquam maximus facilisis nunc quis euismod. Pellentesque vel commodo nisl. Maecenas tincidunt ex sed mi lacinia consectetur. Sed mi dolor, fermentum ac condimentum id, efficitur vitae orci. Proin non ex malesuada, feugiat felis dignissim, blandit ipsum. Curabitur blandit risus sit amet augue ullamcorper, rhoncus porttitor ipsum placerat. Quisque eget diam a erat pretium pulvinar non commodo arcu. Aliquam a elit commodo, fringilla nibh in, tempus ligula. Aliquam aliquet turpis ac erat vestibulum, et scelerisque nisl ullamcorper. Integer porttitor mauris et mi maximus porta. Aliquam porttitor aliquam magna sed tincidunt. Proin iaculis pulvinar laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque bibendum dolor ac porta sollicitudin. Vestibulum id hendrerit dui. Nam maximus, lacus vel laoreet faucibus, libero enim posuere magna, vitae pretium est odio tristique ex. Aenean nisi nulla, feugiat non porta sed, luctus ut justo. Nullam mattis egestas arcu, nec sodales lacus scelerisque nec. Suspendisse faucibus sapien quis tellus gravida sagittis. Maecenas dignissim accumsan pharetra. In nisl nibh, accumsan nec ipsum euismod, pellentesque venenatis risus. Mauris volutpat leo eu mauris sodales dictum. Mauris sed arcu non nisl consequat scelerisque. Nunc sed nisl sit amet eros ullamcorper pellentesque auctor vel lacus. Integer tincidunt odio vel mi pretium lobortis. Aliquam erat volutpat. Vivamus quis diam at nisi scelerisque condimentum quis convallis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis mattis imperdiet ante, in tempor nibh congue nec. Etiam vitae sapien libero. Cras tellus felis, placerat in purus ac, blandit venenatis eros. Nullam semper metus lectus, ac maximus mi egestas a. Quisque faucibus bibendum purus, a dictum odio pharetra nec. In vel turpis ex. Pellentesque hendrerit in libero eget ultrices. Integer et lectus vel sapien lacinia scelerisque vitae a mi. Sed dapibus mattis purus vel ullamcorper. Ut et mi blandit, tristique leo eu, varius elit. Donec pharetra imperdiet rhoncus. In congue nunc eu arcu efficitur, ut elementum nisi ornare. Nulla consectetur bibendum enim porttitor pretium. Nunc condimentum finibus enim eu convallis. Aliquam augue libero, interdum a pharetra finibus, sodales nec nisi. Etiam nec ipsum tempus, malesuada tortor vitae, ultricies augue. Nam et dui non enim luctus tempor. Donec eget eros id tortor euismod feugiat sit amet id magna. Integer dolor diam, consectetur at velit non, congue convallis ex. Curabitur molestie vel ante sit amet vestibulum. Mauris non ultricies metus, ut mattis augue. Ut laoreet ex enim, a condimentum erat eleifend ac. Morbi ac elementum tellus. Proin efficitur luctus facilisis. Proin convallis metus ac urna auctor, non cursus lorem sodales. Phasellus at malesuada odio. Quisque nec iaculis enim. Vivamus lacus odio, mattis ac augue a, interdum varius elit. Morbi pulvinar, risus et elementum luctus, magna lectus hendrerit mi, tristique aliquet tellus libero sed sapien. Nullam ac bibendum sapien. Suspendisse potenti. Sed tempus et dolor in imperdiet.';

export default {
  title: 'Example/ReadTimeEstimation',
  component: 'jio-read-time-estimation',
} as Meta;

const createContentElement = (text: string): HTMLElement | null => {
  if (!text) return null;
  const div = document.createElement('div');
  div.innerHTML = text; 
  return div;
};

const render = ({content, wordsPerMinute}: {content: string, wordsPerMinute: number}) => {
  const contentElement = createContentElement(content);
  return html`
    <jio-read-time-estimation 
      .content=${contentElement}
      .wordsPerMinute=${wordsPerMinute}>
    </jio-read-time-estimation>
  `;
};

export const ShortContent: StoryObj<{content: string, wordsPerMinute: number}> = {
  render,
  args: {
    content: shortContent,
    wordsPerMinute: 200,
  },
  play: async ({canvasElement}) => {
    const element = canvasElement.querySelector('jio-read-time-estimation') as ReadTimeEstimation;
    await element.updateComplete;
    const shadowRoot = element.shadowRoot;
    expect(shadowRoot?.textContent).toContain('1 min read');
  }
};

export const MediumContent: StoryObj<{content: string, wordsPerMinute: number}> = {
  render,
  args: {
    content: mediumContent,
    wordsPerMinute: 200,
  },
  play: async ({canvasElement}) => {
    const element = canvasElement.querySelector('jio-read-time-estimation') as ReadTimeEstimation;
    await element.updateComplete;
    const shadowRoot = element.shadowRoot;
    expect(shadowRoot?.textContent).toContain('2 min read');
  }
};

export const LongContent: StoryObj<{content: string, wordsPerMinute: number}> = {
  render,
  args: {
    content: longContent,
    wordsPerMinute: 200,
  },
  play: async ({canvasElement}) => {
    const element = canvasElement.querySelector('jio-read-time-estimation') as ReadTimeEstimation;
    await element.updateComplete;
    const shadowRoot = element.shadowRoot;
    expect(shadowRoot?.textContent).toContain('3 min read');
  }
};

export const CustomWordsPerMinute: StoryObj<{content: string, wordsPerMinute: number}> = {
  render,
  args: {
    content: '',
    wordsPerMinute: 150,
  },
  play: async ({canvasElement}) => {
    const element = canvasElement.querySelector('jio-read-time-estimation') as ReadTimeEstimation;
    await element.updateComplete;
    const shadowRoot = element.shadowRoot;
    expect(shadowRoot?.textContent).toContain(shadowRoot?.textContent);
  }
};
