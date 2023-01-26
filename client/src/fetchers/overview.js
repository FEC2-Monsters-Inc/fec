import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api';

export default {
  getStylesById: (id) => {
    let options = {
      url: SERVER_BASEURL + `/products/${id}/styles`,
      method: 'get'
    };

    return axios(options);
  }
};