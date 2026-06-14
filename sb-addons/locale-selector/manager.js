import * as React from 'react';
import {useParameter, addons, types} from 'storybook/manager-api';
import {IconButton, WithTooltip, TooltipLinkList} from 'storybook/internal/components';
import {getByTag} from 'locale-codes';


addons.register('jenkins-io-components/locale-selector', (api) => {
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
            🌐
          </IconButton>
        </WithTooltip>
      );
    }
  });
});
