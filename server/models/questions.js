const axios = require('axios');

const endpoint = process.env.BASEURL + '/qa/questions';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getQuestionsByProductId: (product_id) => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: {
        product_id: product_id,
        count: 50
      }
    };

    return axios(options);
  }
};