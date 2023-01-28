import axios from 'axios';

const BASEURL = 'http://localhost:3000/api/qa/questions';

export default {
  getById: (product_id) => {
    const options = {
      url: BASEURL,
      method: 'get',
      params: {
        product_id,
      },
    };

    return axios(options);
  },
};
