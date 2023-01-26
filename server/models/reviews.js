const axios = require('axios');

const endpoint = process.env.BASEURL + '/reviews';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getReviews: (id) => {
    //console.log(id);
    let options = {
      url: endpoint + '/'
      method: 'get',
      headers: authHeader,
      params: {
        product_id: id
      }
    };
    return axios(options)
      .catch((error) => console.log('error: ', error));
  }
};