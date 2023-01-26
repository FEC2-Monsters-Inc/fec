import axios from 'axios';

const BASEURL = 'http://localhost:3000/api/questions';

export default {
  getById: (product_id) => {
    let options = {
      url: BASEURL + `/${product_id}`,
      method: 'get'
    };

    return axios(options);
  }

};