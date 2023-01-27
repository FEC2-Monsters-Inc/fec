const axios = require('axios');

const endpoint = process.env.BASEURL + '/qa/questions';
const endpoint = process.env.BASEURL + '/qa/questions';
const authHeader = {
  'Authorization': process.env.TOKEN
};

module.exports = {
  getQuestions: (query) => {
    let options = {
      url: endpoint,
      method: 'get',
      headers: authHeader,
      params: query
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

  reportQuestion: () => {

  },

  markHelpfulQuestion: () => {

  },

  getAnswers: (id) => {
    let options = {
      url: endpoint + `/${id}/answers`,
      method: 'get',
      headers: authHeader
    };
    return axios(options);
  },

  answerQuestion: () => {

  },

  markHelpfulAnswer: () => {

  },

  reportAnswer: () => {

  }
};