import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api/reviews';


export default {
  // YOUR REQUESTS HERE
  getReviews: (id) => {
    let options = {
      url: SERVER_BASEURL + `/${id}`,
      method: 'get',
    };

    return axios(options);
  }
};

