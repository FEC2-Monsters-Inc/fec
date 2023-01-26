import axios from 'axios';
import overview from './overview.js';
import related from './related.js';
import questions from './questions.js';
import ratings from './ratings.js';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {
  overview: overview,
  related: related,
  questions: questions,
  ratings: ratings,

  getProductById: (id) => {
    let options = {
      url: SERVER_BASEURL + `/products/${id}`,
      method: 'get'
    };

    return axios(options);
  }
};