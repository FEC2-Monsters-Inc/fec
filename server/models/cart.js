const axios = require('axios');

const endpoint = process.env.BASEURL + '/cart';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getCartItems: () => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  },

  addCartItem: (item) => {
    let options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: item
    };
    return axios(options);
  }
};