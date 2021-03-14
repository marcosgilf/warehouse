import { html } from 'lit-html';
import '../warehouse-products.js';

export default {
  title: 'Products',
  component: 'warehouse-products',
};

function Template({ title }) {
  return html` <warehouse-products .title=${title}> </warehouse-products> `;
}

export const Products = Template.bind({});
Products.args = {
  title: 'My products',
};
