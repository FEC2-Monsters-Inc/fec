const axios = require('axios');

const endpoint = process.env.PRODUCT_BASEURL + '/products';
const authHeader = {
  'Authorization': process.env.TOKEN
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

  getProductById: (productId) => {
    let options = {
      url: endpoint + `/${productId}`,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  }
};