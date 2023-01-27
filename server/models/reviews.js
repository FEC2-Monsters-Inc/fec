const axios = require('axios');

const endpoint = process.env.BASEURL + '/reviews';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getReviews: ({ page, count, sort, product_id }) => {

    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: {
        'page': page || 1,
        'count': count || 5,
        'sort': sort || 'relevant',
        'product_id': product_id
      }
    };
    return axios(options);
  },

  getReviewMeta: ({ product_id }) => {

    let options = {
      url: endpoint + '/meta',
      method: 'get',
      headers: authHeader,
      params: {
        'product_id': product_id
      }
    };
    return axios(options);
  },

  addReviews: (review) => {

    let options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: review
    };
    return axios(options);
  },

  updateUseful: (id) => {

    let options = {
      url: endpoint + `/${id}/helpful`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },

  updateReport: (id) => {

    let options = {
      url: endpoint + `/${id}/report`,
      method: 'put',
      headers: authHeader,
    };
    return axios(options);
  },
};