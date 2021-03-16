import { LitElement, html, css } from 'lit-element';

export class Cart extends LitElement {
  static get properties() {
    return {
      cart: { type: Array },
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
    this.cart = [];
  }

  render() {
    return html` ${this.renderCart()} `;
  }

  renderCart() {
    if (this.cart && this.cart.length > 0) {
      return html`<ul class="cart">
          ${this.cart.map(
            product =>
              html`<li>
                ${product.name}${this.renderDeleteButton(product.id)}
              </li>`,
          )}
        </ul>
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
