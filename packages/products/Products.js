import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

export class Products extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
      stock: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;
        text-align: center;
      }
    `;
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
              ${product.name} ${this.renderStock(index)}
              ${this.renderBuyButton(product.id)}
              ${this.renderArticleList(product.articles)}
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
      ? html`<span class="stock">${this.stock[index].amountInStock}</span>`
      : nothing;
  }

  // eslint-disable-next-line class-methods-use-this
  renderBuyButton(id) {
    return this.stock.find(product => product.id === id)
      ? html`<button class="buy" @click=${e => this.handleClickEvent(e, id)}>
          Buy
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
