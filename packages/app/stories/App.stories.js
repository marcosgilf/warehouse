import { html } from 'lit-html';
import sinon from 'sinon';
import { apiArticles } from '../mocks/apiArticles.js';
import { apiProducts } from '../mocks/apiProducts.js';
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
      .resolves(mockApiResponse(apiProducts))
      .withArgs(endpoints.articles)
      .resolves(mockApiResponse(apiArticles));
  }

  return html`
    <warehouse-app
      style="--warehouse-app-background-color: ${backgroundColor || 'white'}"
    >
    </warehouse-app>
  `;
}

export const App = Template.bind({});
