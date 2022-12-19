import * as React from 'react';
import {useParameter} from '@storybook/api';
import {GLOBALS_UPDATED} from '@storybook/core-events';
import {addons, types} from '@storybook/addons';
import {Icons, IconButton, WithTooltip, TooltipLinkList} from '@storybook/components';
import {getByTag} from 'locale-codes';


addons.register('jenkins-io-components/locale-selector', (api) => {
  const chan = addons.getChannel();
  addons.add('jenkins-io-components/toolbar', {
    title: 'Example Storybook toolbar',
    //👇 Sets the type of UI element in Storybook
    type: types.TOOL,
    //👇 Shows the Toolbar UI element if either the Canvas or Docs tab is active
    match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ({active}) => {
      const [expanded, setExpanded] = React.useState(false);

      const {allLocales} = useParameter('locales', {allLocales: ['en']});
      const items = allLocales.map(locale => {
        return {
          id: locale,
          title: getByTag(locale).name,
          active: locale === (api.getQueryParam('locale') || allLocales[0]),
          onClick: () => {
            api.setQueryParams({locale: locale})
            const iframe = document.getElementById('storybook-preview-iframe');
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.dispatchEvent(new CustomEvent('jio-locale-changed', {
                bubbles: true,
                detail: {locale}
              }));
              /*
              const parsed = new URL(iframe.src);
              const usp = new URLSearchParams(parsed.searchParams);
              usp.set('locale', locale);
              parsed.search = usp.toString();
              iframe.src = parsed.toString();
              */
            }
          }
        };
      });

      return (
        <WithTooltip
          placement="top"
          trigger="click"
          tooltipShown={expanded}
          onVisibilityChange={(newVisibility) =>
            setExpanded(newVisibility)
          }
          tooltip={<TooltipLinkList links={items} />}
          closeOnClick
        >
          <IconButton active={active} title="Choose a language">
            <Icons icon="globe" />
          </IconButton>
        </WithTooltip>
      );
    }
  });

  chan.on(GLOBALS_UPDATED, ({globals: {locale}}) => {
    console.log('locale', locale);
  });
});
