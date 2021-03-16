import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { apiArticles } from '../mocks/apiArticles.js';
import { apiProducts } from '../mocks/apiProducts.js';
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

  describe('when api calls return successfully', () => {
    beforeEach(async () => {
      sandbox
        .stub(window, 'fetch')
        .withArgs(endpoints.products)
        .resolves(mockApiResponse(apiProducts))
        .withArgs(endpoints.articles)
        .resolves(mockApiResponse(apiArticles));

      element = await fixture(html`<warehouse-app></warehouse-app>`);
    });

    it('renders products component', () => {
      const component = element.shadowRoot.querySelector('.products');
      expect(component.products).to.be.instanceOf(Promise);
    });

    it('passes the a11y audit', async () => {
      await expect(element).shadowDom.to.be.accessible();
    });
  });
});
