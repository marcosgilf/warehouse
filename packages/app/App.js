import { LitElement, html } from 'lit-element';
import { styles } from './App.styles.js';
import { ProductsProvider } from './providers/ProductsProvider.js';

import '../products/warehouse-products.js';

export class App extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.products = [];
    this.provider = new ProductsProvider();
  }

  connectedCallback() {
    super.connectedCallback();

    this.initProducts();
  }

  render() {
    return html`
      <main>
        <h1>Warehouse</h1>

        <warehouse-products
          class="products"
          .products=${this.products}
        ></warehouse-products>
      </main>
    `;
  }

  initProducts() {
    this.products = this.provider.getProductsForUi();
  }
}
