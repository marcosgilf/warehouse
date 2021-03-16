import { html } from 'lit-html';
import { products } from '../mocks/products.js';
import '../warehouse-products.js';

export default {
  title: 'Products',
  component: 'warehouse-products',
};

function Template({ productsFromApi }) {
  return html`
    <warehouse-products .products=${productsFromApi}> </warehouse-products>
  `;
}

export const Products = Template.bind({});
Products.args = {
  productsFromApi: products,
};
