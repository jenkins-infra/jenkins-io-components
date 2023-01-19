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
      color: var(--jio-a-color, #007bff);
    }

    /* visited link */
    a:visited {
      color: var(--jio-a-color, #007bff);
    }

    /* mouse over link */
    a:hover {
      color: var(--jio-a-color, #007bff);
    }

    /* selected link */
    a:active {
      color: var(--jio-a-color, #007bff);
    }

    ion-icon {
      color: black;
      width: 22px;
      height: 22px;
      vertical-align: middle;
    }
`;
