import axios from 'axios';

const BASEURL = 'http://localhost:3000/api/qa/questions';

export default {
  getById: (product_id, page = 1, count = 100) => {
    const options = {
      url: BASEURL,
      method: 'get',
      params: { product_id, page, count },
    };

    return axios(options);
  },

  postQuestion: (data) => {
    const options = {
      url: BASEURL,
      method: 'post',
      data,
    };

    return axios(options);
  },

  postAnswer: (data, question_id) => {
    const options = {
      url: `${BASEURL}/${question_id}/answers`,
      method: 'post',
      data,
    };

    return axios(options);
  },

  markHelpfulQuestion: (question_id) => {
    const options = {
      url: `${BASEURL}/${question_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  markHelpfulAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL}/${answer_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  reportAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL}/${answer_id}/report`,
      method: 'put',
    };

    return axios(options);
  },
};
