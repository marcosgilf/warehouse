import { endpoints } from './endpoints.js';

/* eslint-disable class-methods-use-this */
export class ProductsProvider {
  async getProductsForUi() {
    const products = await this.getProducts();
    const articles = await this.getArticles();
    return this.adaptProducts({ products, articles });
  }

  async getProducts() {
    try {
      const response = await fetch(endpoints.products);
      if (response.ok) {
        return response.clone().json();
      }
      throw new Error(response.statusText);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return [];
    }
  }

  async getArticles() {
    try {
      const response = await fetch(endpoints.articles);
      if (response.ok) {
        return response.clone().json();
      }
      throw new Error(response.statusText);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return [];
    }
  }

  adaptProducts({ products, articles } = {}) {
    if (!products) {
      return [];
    }

    return products.map(product => ({
      ...product,
      articles: product.articles.map(productArticle => {
        let extraInfo = {};

        if (articles) {
          extraInfo = articles.find(
            article => article.id === productArticle.id,
          );
        }

        return {
          ...productArticle,
          ...extraInfo,
        };
      }),
    }));
  }

  async postSale(data) {
    try {
      const response = await fetch(endpoints.sale, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(this.adaptSale(data)),
      });
      if (response.ok) {
        return response.clone().json();
      }
      throw new Error(response.statusText);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      return [];
    }
  }

  adaptSale(sale) {
    return {
      productId: sale.id,
      amountSold: 1,
    };
  }
}
