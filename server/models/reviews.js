const axios = require('axios');

const endpoint = process.env.BASEURL + '/reviews';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getAllReviews: (id) => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: {
        product_id: id,
      }
    };
    return axios(options);
  }
};