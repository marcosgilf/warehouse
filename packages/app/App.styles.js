import { css } from 'lit-element';

export const styles = css`
  :host {
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    background-color: var(--warehouse-app-background-color);
    min-height: 100vh;
    max-width: 960px;
    display: flex;
    flex-direction: column;
  }

  main {
    flex-grow: 1;
  }
`;
