import { html } from 'lit-html';
import { products, productsIncomplete } from '../../products/mocks/products.js';
import { stock } from '../../products/mocks/stock.js';
import '../warehouse-cart.js';

export default {
  title: 'Cart',
  component: 'warehouse-cart',
};

function Template({ productsInsideCart, computedStock }) {
  return html`
    <warehouse-cart
      .cart=${productsInsideCart}
      .stock=${computedStock}
      @product-clicked=${console.log}
    >
    </warehouse-cart>
  `;
}

export const Default = Template.bind({});
Default.args = {
  productsInsideCart: products,
  computedStock: stock,
};

export const IncompleteData = Template.bind({});
IncompleteData.args = {
  productsInsideCart: productsIncomplete,
  computedStock: [],
};

export const EmptyData = Template.bind({});
EmptyData.args = {
  productsInsideCart: [],
  computedStock: [],
};
