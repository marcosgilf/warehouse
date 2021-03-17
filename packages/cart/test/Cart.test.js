import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { products } from '../../products/mocks/products.js';
import { stock } from '../../products/mocks/stock.js';

import '../warehouse-cart.js';

describe('Cart', () => {
  let element;

  describe('when cart is empty', () => {
    beforeEach(async () => {
      element = await fixture(html`<warehouse-cart></warehouse-cart>`);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render empty array if cart is empty', () => {
      expect(element.shadowRoot.innerHTML).to.contain('The cart is empty.');
    });

    it('should not render "buy" button', async () => {
      expect(element.shadowRoot.querySelectorAll('.buy')).to.be.empty;
    });

    it('should not render "delete" button', async () => {
      expect(element.shadowRoot.querySelectorAll('.delete')).to.be.empty;
    });
  });

  describe('when cart and stock is setted', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<warehouse-cart
          .cart=${products}
          .stock=${stock}
        ></warehouse-cart>`,
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render list of products', () => {
      const list = element.shadowRoot.querySelector('.cart');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(2);
    });

    it.skip('should render counter for each product', () => {
      const counter = element.shadowRoot.querySelectorAll('.counter');
      expect(counter.length).to.equal(2);
    });

    it('should render "buy" button', () => {
      const buttons = element.shadowRoot.querySelectorAll('.buy');
      expect(buttons.length).to.equal(1);
    });

    it('should render "delete" button', () => {
      const buttons = element.shadowRoot.querySelectorAll('.delete');
      expect(buttons.length).to.equal(2);
    });
  });

  describe('events', () => {
    it('should send "buy-clicked" when the user clicks on a product', async () => {
      const spy = sinon.spy();
      element = await fixture(
        html`<warehouse-cart
          .cart=${products}
          .stock=${stock}
          @buy-clicked=${spy}
        ></warehouse-cart>`,
      );

      element.shadowRoot.querySelector('.buy').click();

      expect(spy.calledOnce).to.be.true;
    });

    it('should send "delete-clicked" with "id" when the user clicks on delete product', async () => {
      const spy = sinon.spy();
      element = await fixture(
        html`<warehouse-cart
          .cart=${products}
          .stock=${stock}
          @delete-clicked=${spy}
        ></warehouse-cart>`,
      );

      element.shadowRoot.querySelector('.delete').click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0].detail.id).to.equal(products[0].id);
    });
  });
});
