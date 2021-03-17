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
    display: flex;
    flex-direction: column;
  }

  .container {
    border: 1px solid coral;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
    max-width: 400px;
  }

  .cart {
    padding: 0;
  }

  .cart > li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .cart > li:last-child {
    margin-bottom: 24px;
  }
`;
