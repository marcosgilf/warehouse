import { LitElement, html } from 'lit-element';
import { styles } from './Cart.styles.js';

export class Cart extends LitElement {
  static get properties() {
    return {
      cart: { type: Array },
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.cart = [];
  }

  render() {
    return html`<div class="container">${this.renderCart()}</div>`;
  }

  renderCart() {
    if (this.cart && this.cart.length > 0) {
      return html`<ol class="cart">
          ${this.cart.map(
            product =>
              html`<li>
                ${product.name}${this.renderDeleteButton(product.id)}
              </li>`,
          )}
        </ol>
        ${this.renderBuyButton()}`;
    }

    return 'The cart is empty.';
  }

  renderDeleteButton(id) {
    return html`<button
      class="delete"
      @click=${e => this.handleDeleteClickEvent(e, id)}
    >
      Delete
    </button>`;
  }

  handleDeleteClickEvent(event, id) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('delete-clicked', {
        detail: {
          id,
        },
      }),
    );
  }

  renderBuyButton() {
    return html`<button class="buy" @click=${e => this.handleClickEvent(e)}>
      Buy
    </button>`;
  }

  handleClickEvent(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('buy-clicked'));
  }
}
