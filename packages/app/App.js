import { LitElement, html } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { styles } from './App.styles.js';
import { ProductsProvider } from './providers/ProductsProvider.js';

import '../products/warehouse-products.js';

export class App extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
      cart: { type: Array },
      stock: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();

    this.products = [];
    this.cart = [];
    this.stock = [];
    this.provider = new ProductsProvider();
  }

  connectedCallback() {
    super.connectedCallback();

    this.initProducts();
  }

  updated(changedProperties) {
    if (changedProperties.has('products')) {
      this.stock =
        this.products.length > 0
          ? this.products.map(product => {
              const amounts =
                product.articles && product.articles[0].amountInStock
                  ? product.articles.map(
                      article => article.amountInStock / article.amountRequired,
                    )
                  : [];
              const amountInStock =
                Math.min(...amounts) !== Infinity ? Math.min(...amounts) : null;
              return { id: product.id, amountInStock };
            })
          : [];
    }
  }

  render() {
    return html`
      <main>
        <h1>Warehouse</h1>
        ${this.resolveProducts()} ${this.renderCart()}
      </main>
    `;
  }

  initProducts() {
    this.products = this.provider.getProductsForUi();
  }

  postSale() {
    // this.provider.postSale(this.cart);
    this.cart = [];
  }

  resolveProducts() {
    if (this.products && this.products.then) {
      return until(
        this.products.then(products => {
          this.products = [...products];
          return this.renderProducts(products);
        }),
        'Loading...',
      );
    }

    return this.renderProducts(this.products);
  }

  renderProducts() {
    return html`
      <warehouse-products
        class="products"
        .products=${this.products}
        .stock=${this.stock}
        @product-clicked=${this.handleProductClicked}
      ></warehouse-products>
    `;
  }

  renderCart() {
    return html`<warehouse-cart
      class="cart"
      .cart=${this.cart}
      .stock=${this.stock}
      @delete-clicked=${this.handleDeleteClicked}
      @buy-clicked=${() => this.postSale()}
    ></warehouse-cart>`;
  }

  handleProductClicked({ detail }) {
    if (!this.cart.find(product => product.id === detail.id)) {
      this.cart = [
        ...this.cart,
        this.products.find(product => product.id === detail.id),
      ];
    }
  }

  handleDeleteClicked({ detail }) {
    if (this.cart.find(product => product.id === detail.id)) {
      this.cart = [...this.cart.filter(product => product.id !== detail.id)];
    }
  }
}
