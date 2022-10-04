import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

const SHORT_MONTH_NAMES = Object.freeze([
  'Jan', 'Feb', 'March', 'April', 'May', 'Jun',
  'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
]);

//const DAYS_OF_WEEK = Object.freeze([
//  null,
//  'Monday',
//  'Tuesday',
//  'Wednesday',
//  'Thursday',
//  'Friday',
//  'Saturday',
//  'Sunday',
//]);

const dateConverter = (value: string | null): Date | undefined => {
  if (!value) {return;}
  return new Date(value);
};


@customElement('jio-datetime-box')
export class DatetimeBox extends LitElement {
  static override styles = css`
  .date-time {
    background: #157ea7;
    border-radius:.5em;
    color: #fff;
    display: inline-block;
    font-size: 1rem;
    font-size: .75rem;
    height: 4.75em;
    overflow: hidden;
    padding: 0.5em;
    position: relative;
    text-align: center;
    width: 4.75em;
  }

  .date {
    background: rgba(180,40,40,.85);
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border: 1px solid rgba(180,40,40,.85);
    box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
    font-size: .75em;
    font-weight: normal;
    height: 2em;
    text-align: center;
    margin-top: -0.75em;
    margin-left: -0.75em;
    margin-right: -0.75em;
    height: 2em;
    line-height: 2em;
  }

  .time{
    font-size: 1.1em;
    white-space: nowrap;
    line-height: 3em;
    height: 3em;
  }
  `;

  @property({
    reflect: true,
    converter: dateConverter,
  })
  date: Date | undefined;

  @property({
    reflect: true,
    converter: dateConverter,
  })
  endDate: Date | undefined;

  override render() {
    if (!this.date) {return;}

    let endDateHtml = html``;
    if (this.endDate) {
      endDateHtml = html`
      -
        <time datetime=${this.endDate.toISOString()} title="End Time">
          <span class="month">${SHORT_MONTH_NAMES[this.endDate.getUTCMonth()]}</span>
          <span class="day">${this.endDate.getUTCDate().toString().padStart(2, '0')}</span>
        </time>
      `;
    }
    return html`
        <!-- jio-datetime START -->
        <div class="date-time">
          <div class="date">
            <time datetime=${this.date.toISOString()} title="Start Time">
              <span class="month">${SHORT_MONTH_NAMES[this.date.getUTCMonth()]}</span>
              <span class="day">${this.date.getUTCDate().toString().padStart(2, '0')}</span>
            </time>
            ${endDateHtml}
          </div>
          <div class="time">
            ${`${(this.date.getUTCHours() + 1).toString().padStart(2, '0')}:${(this.date.getUTCMinutes() + 1).toString().padStart(2, '0')} ${this.date.getUTCHours() + 1 <= 12 ? 'AM' : 'PM'}`}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'jio-datetime-box': DatetimeBox;
  }
}

