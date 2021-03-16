import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { until } from 'lit-html/directives/until';

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
    return html`${this.resolveProducts()}`;
  }

  resolveProducts() {
    if (this.products && this.products.then) {
      return until(
        this.products.then(products => {
          this.products = [...products];
          return this.renderProductList(products);
        }),
        'Loading...',
      );
    }

    return this.renderProductList(this.products);
  }

  // eslint-disable-next-line class-methods-use-this
  renderProductList(products) {
    return products && products.length > 0
      ? html`<ul class="products">
          ${products.map(
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
    return this.stock.length > 0 && this.stock[index].amountInStock
      ? html`<span class="stock">${this.stock[index].amountInStock}</span>`
      : nothing;
  }

  // eslint-disable-next-line class-methods-use-this
  renderBuyButton(id) {
    return html`<button class="buy" @click=${e => this.handleClickEvent(e, id)}>
      Buy
    </button>`;
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
