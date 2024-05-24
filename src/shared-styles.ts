import { css } from 'lit';

export const ionIconText = css`
    a {
      display: inline-block;
      vertical-align: middle;
      text-decoration: none;
      background-color: transparent;
      text-decoration-thickness: 2px;
      text-decoration-skip: none;
      text-underline-offset: 2px;
    }
    /* unvisited link */
    a:link {
      color: var(--link-color);
    }

    /* visited link */
    a:visited {
      color: var(--link-color);
    }

    /* mouse over link */
    a:hover {
      color: var(--link-color);
    }

    /* selected link */
    a:active {
      color: var(--link-color);
    }

    ion-icon {
      color: black;
      width: 22px;
      height: 22px;
      vertical-align: middle;
    }
`;
