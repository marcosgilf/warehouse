import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import { products, productsIncomplete } from '../mocks/products.js';
import { stock } from '../mocks/stock.js';

import '../warehouse-products.js';

describe('Products', () => {
  let element;

  describe('when products is empty', () => {
    beforeEach(async () => {
      element = await fixture(html`<warehouse-products></warehouse-products>`);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render empty array if products is empty', () => {
      expect(element.shadowRoot.innerHTML).to.contain(
        'No products available now.',
      );
    });

    it('should render loading text if products is an unresolved promise', async () => {
      element.products = new Promise(() => 1);
      await nextFrame();
      expect(element.shadowRoot.innerHTML).to.contain('Loading...');
    });

    it('should not render "buy" button', async () => {
      expect(element.shadowRoot.querySelectorAll('.buy')).to.be.empty;
    });
  });

  describe('when products is complete', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<warehouse-products
          .products=${products}
          .stock=${stock}
        ></warehouse-products>`,
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render list of products names if products is not empty', () => {
      const list = element.shadowRoot.querySelector('.products');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(2);
    });

    it('should render list of products articles if products have articles with names', () => {
      const list = element.shadowRoot.querySelector('.articles');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(3);
    });

    it('should render products stock', () => {
      const stockElement = element.shadowRoot.querySelectorAll('.stock');
      expect(stockElement[0].innerHTML).to.contain('2');
      expect(stockElement[1].innerHTML).to.contain('1');
    });

    it('should render "buy" button', async () => {
      const buttons = element.shadowRoot.querySelectorAll('.buy');
      expect(buttons.length).to.equal(2);
    });
  });

  describe('when products is incomplete', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<warehouse-products
          .products=${productsIncomplete}
        ></warehouse-products>`,
      );
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('should render list of products names if products is not empty', () => {
      const list = element.shadowRoot.querySelector('.products');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(2);
    });

    it('should not render list of products articles if products have articles without names', () => {
      const list = element.shadowRoot.querySelector('.articles');
      expect(list).to.be.null;
    });

    it('should not render products stock', () => {
      const stockElement = element.shadowRoot.querySelectorAll('.stock');
      expect(stockElement).to.be.empty;
    });

    it('should render "buy" button', async () => {
      const buttons = element.shadowRoot.querySelectorAll('.buy');
      expect(buttons.length).to.equal(2);
    });
  });

  describe('events', () => {
    it('should send "product-clicked" with "id" when the user clicks on a product', async () => {
      const spy = sinon.spy();
      element = await fixture(
        html`<warehouse-products
          .products=${productsIncomplete}
          @product-clicked=${spy}
        ></warehouse-products>`,
      );

      const product = element.shadowRoot.querySelector('.buy');
      product.click();

      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0].detail.id).to.equal(productsIncomplete[0].id);
    });
  });
});
