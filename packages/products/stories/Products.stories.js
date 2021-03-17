import { html } from 'lit-html';
import { products, productsIncomplete } from '../mocks/products.js';
import { stock } from '../mocks/stock.js';
import '../warehouse-products.js';

export default {
  title: 'Products',
  component: 'warehouse-products',
};

function Template({ productsFromApi, computedStock }) {
  return html`
    <warehouse-products
      .products=${productsFromApi}
      .stock=${computedStock}
      @product-clicked=${console.log}
    >
    </warehouse-products>
  `;
}

export const Default = Template.bind({});
Default.args = {
  productsFromApi: products,
  computedStock: stock,
};

export const IncompleteData = Template.bind({});
IncompleteData.args = {
  productsFromApi: productsIncomplete,
  computedStock: [],
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  productsFromApi: [],
  computedStock: [],
};

export const LoadingData = Template.bind({});
LoadingData.args = {
  productsFromApi: new Promise(() => 1),
  computedStock: [],
};
