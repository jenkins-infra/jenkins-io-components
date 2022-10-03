import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {EnumWeatherIcons} from './jio-weather-icon.js';

@customElement('jio-changelog-weather-icon')
export class ChangelogWeatherIcon extends LitElement {
  static override styles = css`
  .light {
    opacity: 0.5;
  }
  `;

  @property({type: String})
  mode: EnumWeatherIcons = EnumWeatherIcons.Sunny;

  @property({type: Number})
  count = 0;

  override render() {
    const titles = {
      sunny: 'No major issues with this release',
      cloudy: 'I experienced notable issues',
      storm: 'I had to roll back',
    } as Record<EnumWeatherIcons, string>;

    return html`
      <span>
        ${this.count}
        <span class=${this.count === 0 ? 'light' : ''}><jio-weather-icon weather=${this.mode} title=${titles[this.mode]}></jio-weather-icon></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-changelog-weather-icon': ChangelogWeatherIcon;
  }
}
