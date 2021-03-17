import { css } from 'lit-element';

export const styles = css`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  :host {
    font-size: calc(10px + 2vmin);
    display: flex;
    flex-direction: column;
  }

  .products {
    padding: 0;
    text-indent: 0;
    list-style-type: none;
  }

  .products > li {
    border: 1px solid black;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
    max-width: 400px;
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .products-body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
