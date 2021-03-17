import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { styles } from './Products.styles.js';

export class Products extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
      stock: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.products = [];
    this.stock = [];
  }

  render() {
    return html`${this.resolveProducts()}`;
  }

  resolveProducts() {
    if (this.products && this.products.then) {
      return 'Loading...';
    }

    return this.renderProductList();
  }

  renderProductList() {
    return this.products && this.products.length > 0
      ? html`<ul class="products">
          ${this.products.map(
            (product, index) => html` <li>
              <div class="product-header"><h2>${product.name}</h2> ${this.renderStock(index)}</div>
              <div class="products-body">
                ${this.renderArticleList(product.articles)}
                ${this.renderBuyButton(product.id)}
              </div>
            </li>`,
          )}
        </ul> `
      : 'No products available now.';
  }

  // eslint-disable-next-line class-methods-use-this
  renderArticleList(articles) {
    return articles && articles[0].name
      ? html`<ul class="articles">
          ${articles.map(
            article =>
              html`<li>
                ${article.name}: ${article.amountRequired} (in stock
                ${article.amountInStock})
              </li>`,
          )}
        </ul>`
      : nothing;
  }

  renderStock(index) {
    return this.stock[index] && this.stock[index].amountInStock
      ? html`<span class="stock">STOCK ${this.stock[index].amountInStock}</span>`
      : nothing;
  }

  // eslint-disable-next-line class-methods-use-this
  renderBuyButton(id) {
    return this.stock.find(product => product.id === id)
      ? html`<button class="buy" @click=${e => this.handleClickEvent(e, id)}>
          Add to cart
        </button>`
      : nothing;
  }

  handleClickEvent(event, id) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('product-clicked', {
        detail: {
          id,
        },
      }),
    );
  }
}
