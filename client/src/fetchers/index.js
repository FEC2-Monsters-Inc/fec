import axios from 'axios';
import overview from './overview';
import related from './related';
import questions from './questions';
import ratings from './ratings';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {
  overview,
  related,
  questions,
  ratings,

  getProductById: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}`,
      method: 'get',
    };

    return axios(options);
  },
};
