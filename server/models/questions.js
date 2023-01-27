const axios = require('axios');

const endpoint = process.env.BASEURL + '/qa/questions';
const answerEndpoint = process.env.BASEURL + '/qa/answers';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getQuestions: ({ count, page, product_id }) => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: {
        'page': page || 1,
        'count': count || 5,
        'product_id': product_id
      }
    };
    return axios(options);
  },

  getAnswers: (id, page, count) => {
    let options = {
      url: endpoint + `/${id}/answers`,
      method: 'get',
      headers: authHeader,
      params: {
        'page': page || 1,
        'count': count || 5
      }
    };
    return axios(options);
  },

  addQuestion: (question) => {
    let options = {
      url: endpoint,
      method: 'post',
      headers: authHeader,
      data: question
    };
    return axios(options);
  },

  answerQuestion: (id, answer) => {
    let options = {
      url: endpoint + `/${id}/answers`,
      method: 'post',
      headers: authHeader,
      data: answer
    };
    return axios(options);
  },

  markHelpfulQuestion: (id) => {
    let options = {
      url: endpoint + `/${id}/helpful`,
      method: 'put',
      headers: authHeader
    };
    return axios(options);
  },

  reportQuestion: (id) => {
    let options = {
      url: endpoint + `/${id}/report`,
      method: 'put',
      headers: authHeader
    };
    return axios(options);
  },

  markHelpfulAnswer: (id) => {
    let options = {
      url: answerEndpoint + `/${id}/helpful`,
      method: 'put',
      headers: authHeader
    };
    return axios(options);
  },

  reportAnswer: (id) => {
    let options = {
      url: answerEndpoint + `/${id}/report`,
      method: 'put',
      headers: authHeader
    };
    return axios(options);
  }
};