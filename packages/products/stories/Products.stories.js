import { html } from 'lit-html';
import { products, productsIncomplete } from '../mocks/products.js';
import '../warehouse-products.js';

export default {
  title: 'Products',
  component: 'warehouse-products',
};

function Template({ productsFromApi }) {
  return html`
    <warehouse-products
      .products=${productsFromApi}
      @product-clicked=${console.log}
    >
    </warehouse-products>
  `;
}

export const Default = Template.bind({});
Default.args = {
  productsFromApi: products,
};

export const IncompleteData = Template.bind({});
IncompleteData.args = {
  productsFromApi: productsIncomplete,
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  productsFromApi: [],
};

export const LoadingData = Template.bind({});
LoadingData.args = {
  productsFromApi: new Promise(() => 1),
};
