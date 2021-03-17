import { endpoints } from './endpoints.js';

/* eslint-disable class-methods-use-this */
export class ProductsProvider {
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
    const salePromises = data.map(async product => {
      const response = await fetch(endpoints.sale, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(this.adaptSale(product)),
      });
      return response;
    });

    const articlesPromises = data.map(async product => {
      const response = await fetch(endpoints.articles, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.adaptArticles(product)),
      });
      return response;
    });

    return Promise.all([...salePromises, ...articlesPromises])
      .then(responses =>
        responses.map(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        }),
      )
      .catch(e => {
        // eslint-disable-next-line no-console
        console.warn(e);
        return [];
      });
  }

  adaptSale(sale) {
    return {
      productId: sale.id,
      amountSold: 1,
    };
  }

  adaptArticles(product) {
    return product.articles.map(article => ({
        id: article.id,
        amountToSubtract: article.amountRequired,
    }));
  }
}
