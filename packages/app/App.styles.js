import { css } from 'lit-element';

export const styles = css`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  :host {
    font-size: calc(10px + 2vmin);
    color: #1a2b42;
    background-color: var(--warehouse-app-background-color);
    min-height: 100vh;
    max-width: 960px;
    display: grid;
    place-content: center;
  }

  h1 {
    text-align: center;
  }

  .products {
    margin-top: 24px;
  }

  .cart {
    margin-top: 24px;
  }
`;
