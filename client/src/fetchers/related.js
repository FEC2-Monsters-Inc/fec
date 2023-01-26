import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {
  // YOUR REQUESTS HERE
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
  }
};