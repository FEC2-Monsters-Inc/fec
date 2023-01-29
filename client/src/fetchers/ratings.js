import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api/reviews/';


export default {
  // YOUR REQUESTS HERE
  getReviews: (id) => {
    let options = {
      url: SERVER_BASEURL,
      method: 'get',
      params: {'product_id': id}
    };

    return axios(options);
  },
  getReviewMeta: (id) => {
    let options = {
      url: SERVER_BASEURL + 'meta',
      method: 'get',
      params: {'product_id': id}
    };

    return axios(options);
  }
};

