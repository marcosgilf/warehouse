import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { products, productsIncomplete } from '../mocks/products.js';

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

    it('renders empty array if products is empty', () => {
      expect(element.shadowRoot.innerHTML).to.contain('No products available now.');
    });

    it('renders loading text if products is an unresolved promise', async () => {
      element.products = new Promise(() => 1);
      await nextFrame();
      expect(element.shadowRoot.innerHTML).to.contain('Loading...');
    });
  });

  describe('when products is complete', () => {
    beforeEach(async () => {
      element = await fixture(html`<warehouse-products .products=${products}></warehouse-products>`);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('renders list of products names if products is not empty', () => {
      const list = element.shadowRoot.querySelector('.products');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(2);
    });

    it('renders list of products articles if products have articles with names', () => {
      const list = element.shadowRoot.querySelector('.articles');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(3);
    });
  });

  describe('when products is incomplete', () => {
    beforeEach(async () => {
      element = await fixture(html`<warehouse-products .products=${productsIncomplete}></warehouse-products>`);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });

    it('renders list of products names if products is not empty', () => {
      const list = element.shadowRoot.querySelector('.products');
      expect(list).to.exist;
      expect(list.childElementCount).to.equal(2);
    });

    it('does not render list of products articles if products have articles without names', () => {
      const list = element.shadowRoot.querySelector('.articles');
      expect(list).to.be.null;
    });
  });
});
