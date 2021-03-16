import { html } from 'lit-html';
import sinon from 'sinon';
import { apiArticles, apiArticles2 } from '../mocks/apiArticles.js';
import { apiProducts, apiProducts2 } from '../mocks/apiProducts.js';
import { apiSale } from '../mocks/apiSales.js';
import { mockApiResponse } from '../mocks/mockApiResponse.js';
import { endpoints } from '../providers/endpoints.js';

import '../warehouse-app.js';

export default {
  title: 'App',
  component: 'warehouse-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const sandbox = sinon.createSandbox();

window.onunload = () => {
  console.log('restoring....');
  sandbox.restore();
};

function Template({ backgroundColor }) {
  if (!fetch.isSinonProxy) {
    sandbox
      .stub(window, 'fetch')
      .withArgs(endpoints.products)
      .onCall(0)
      .resolves(mockApiResponse(apiProducts))
      .onCall(1)
      .resolves(mockApiResponse(apiProducts2))
      .resolves(mockApiResponse(apiProducts))
      .withArgs(endpoints.articles)
      .onCall(0)
      .resolves(mockApiResponse(apiArticles))
      .onCall(1)
      .resolves(mockApiResponse(apiArticles2))
      .resolves(mockApiResponse(apiArticles))
      .withArgs(endpoints.sale)
      .resolves(mockApiResponse(apiSale));
  }

  return html`
    <warehouse-app
      style="--warehouse-app-background-color: ${backgroundColor || 'white'}"
    >
    </warehouse-app>
  `;
}

export const App = Template.bind({});
