import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {
  getProductById: (id) => {
    let options = {
      url: SERVER_BASEURL + `/products/${id}`,
      method: 'get'
    };

    return axios(options);
  },
};