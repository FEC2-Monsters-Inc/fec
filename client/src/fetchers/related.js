import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {

  getRelatedProduct: (id) => {
    let options = {
      url: SERVER_BASEURL + `/products/${id}/related`,
      method: 'get'
    };

    return axios(options);
  },

  getProductStyle: (id) => {
    let options = {
      url: SERVER_BASEURL + `/products/${id}/styles`,
      method: 'get'
    };

    return axios(options);
  },

  getReview: (id) => {
    let options = {
      url: SERVER_BASEURL + '/reviews',
      method: 'get',
      params: {
        product_id: id
      }
    };

    return axios(options);
  },

  getReviewMeta: (id) => {
    let options = {
      url: SERVER_BASEURL + '/reviews/meta',
      method: 'get',
      params: {
        product_id: id
      }
    };

    return axios(options);
  },
};