import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { until } from 'lit-html/directives/until';

export class Products extends LitElement {
  static get properties() {
    return {
      products: { type: Array },
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
  }

  render() {
    return html`${this.resolveProducts()}`;
  }

  resolveProducts() {
    if (this.products && this.products.then) {
      return until(
        this.products.then(products => this.renderProductList(products)),
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
            product => html` <li>
              ${product.name} ${this.renderArticleList(product.articles)}
            </li>`,
          )}
        </ul> `
      : 'No products available now.';
  }

  // eslint-disable-next-line class-methods-use-this
  renderArticleList(articles) {
    return articles && articles[0].name
      ? html`<ul class="articles">
          ${articles.map(article => html`<li>${article.name}</li>`)}
        </ul>`
      : nothing;
  }
}
