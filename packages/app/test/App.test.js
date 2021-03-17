import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import { products } from '../../products/mocks/products.js';
import { stock } from '../../products/mocks/stock.js';
import { apiArticles } from '../mocks/apiArticles.js';
import { apiProducts } from '../mocks/apiProducts.js';
import { apiSale } from '../mocks/apiSales.js';
import { mockApiResponse } from '../mocks/mockApiResponse.js';
import { endpoints } from '../providers/endpoints.js';

import '../warehouse-app.js';

describe('App', () => {
  let element;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('products', () => {
    beforeEach(async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts))
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles));

      element = await fixture(html`<warehouse-app></warehouse-app>`);
    });

    it('should render loading text if products is an unresolved promise', async () => {
      element.products = new Promise(() => 1);
      await nextFrame();
      expect(element.shadowRoot.innerHTML).to.contain('Loading...');
    });

    it('should resolve products and articles provider promise', async () => {
      await nextFrame();
      await nextFrame();
      expect(element.products).to.deep.equal(products);
      expect(element.shadowRoot.querySelector('.products')).dom.to.exist;
    });

    it('should initialize stock property', async () => {
      await nextFrame();
      await nextFrame();
      expect(element.stock).to.deep.equal(stock);
    });
  });

  describe('cart', () => {
    beforeEach(async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts))
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles));

      element = await fixture(html`<warehouse-app></warehouse-app>`);
      await nextFrame();
      await nextFrame();
    });

    it('should render cart component when cart property is setted', async () => {
      element.cart = [{ id: 'a269a247-0d38-4b47-9630-79c9ae545b68' }];
      await nextFrame();
      expect(element.shadowRoot.querySelector('.cart')).dom.to.exist;
    });

    describe('when product is added to cart', () => {
      it('should update cart property on "product-clicked" event', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.cart.length).to.equal(1);
      });

      it('should update articles property on "product-clicked" event', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.articles[0].amountInStock).to.equal(8);
      });

      it('should update stock property when product is added to cart', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: '6fed6191-ee01-4563-a33d-5010abe0db36' },
          }),
        );
        await nextFrame();
        expect(element.stock).to.deep.equal([
          { id: 'a269a247-0d38-4b47-9630-79c9ae545b68', amountInStock: 1 },
        ]);
      });

      it('should not update cart property on "product-clicked" event if the product is already in the cart', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.cart.length).to.equal(1);
      });
    });

    describe('when product is deleted from cart', () => {
      it('should update cart property on "delete-clicked" event', async () => {
        element.cart = [{ id: 'a269a247-0d38-4b47-9630-79c9ae545b68' }];
        const cartElement = element.shadowRoot.querySelector('.cart');
        cartElement.dispatchEvent(
          new CustomEvent('delete-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.cart.length).to.equal(0);
      });

      it('should update articles property on "delete-clicked" event', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        const cartElement = element.shadowRoot.querySelector('.cart');
        cartElement.dispatchEvent(
          new CustomEvent('delete-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.articles[0].amountInStock).to.equal(12);
      });

      it('should update stock property when product is deleted from cart', async () => {
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        const cartElement = element.shadowRoot.querySelector('.cart');
        cartElement.dispatchEvent(
          new CustomEvent('delete-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        await nextFrame();
        expect(element.stock).to.deep.equal([
          { id: 'a269a247-0d38-4b47-9630-79c9ae545b68', amountInStock: 2 },
          { id: '6fed6191-ee01-4563-a33d-5010abe0db36', amountInStock: 1 },
        ]);
      });
    });

    describe('when the user clicks in "buy" product', () => {
      it('should call post provider with cart data on "buy-clicked" event', async () => {
        sandbox
          .stub(element.provider, 'postSale')
          .resolves(mockApiResponse(apiSale));
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        const cartElement = element.shadowRoot.querySelector('.cart');
        cartElement.dispatchEvent(new CustomEvent('buy-clicked'));
        await nextFrame();
        expect(element.provider.postSale.calledOnce).to.be.true;
      });

      it('should reset cart data on "buy-clicked" event', async () => {
        sandbox
          .stub(element.provider, 'postSale')
          .resolves(mockApiResponse(apiSale));
        const productsElement = element.shadowRoot.querySelector('.products');
        productsElement.dispatchEvent(
          new CustomEvent('product-clicked', {
            detail: { id: 'a269a247-0d38-4b47-9630-79c9ae545b68' },
          }),
        );
        const cartElement = element.shadowRoot.querySelector('.cart');
        cartElement.dispatchEvent(new CustomEvent('buy-clicked'));
        await nextFrame();
        expect(element.cart).to.be.empty;
      });
    });
  });
});
