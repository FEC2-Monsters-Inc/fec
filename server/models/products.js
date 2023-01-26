const axios = require('axios');

const endpoint = process.env.BASEURL + '/products';
const authHeader = {
  'Authorization': process.env.TOKEN,
};

module.exports = {
  getProducts: () => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  },

  getProductById: (product_id) => {
    let options = {
      url: endpoint + `/${product_id}`,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  },

  getRelatedProduct: (product_id) => {

    let options = {
      url: endpoint + `/${product_id}/related`,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  },

  getProductStyle: (product_id) => {

    let options = {
      url: endpoint + `/${product_id}/styles`,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  }
};