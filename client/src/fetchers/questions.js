import axios from 'axios';

const BASEURL_QUESTIONS = 'http://localhost:3000/api/qa/questions';
const BASEURL_ANSWERS = 'http://localhost:3000/api/qa/answers';

export default {
  getQuestionsById: (product_id, page = 1, count = 100) => {
    const options = {
      url: BASEURL_QUESTIONS,
      method: 'get',
      params: { product_id, page, count },
    };

    return axios(options);
  },

  postQuestion: (data) => {
    const options = {
      url: BASEURL_QUESTIONS,
      method: 'post',
      data,
    };

    return axios(options);
  },

  postAnswer: (data, question_id) => {
    const options = {
      url: `${BASEURL_QUESTIONS}/${question_id}/answers`,
      method: 'post',
      data,
    };

    return axios(options);
  },

  markHelpfulQuestion: (question_id) => {
    const options = {
      url: `${BASEURL_QUESTIONS}/${question_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  markHelpfulAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL_ANSWERS}/${answer_id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  reportAnswer: (answer_id) => {
    const options = {
      url: `${BASEURL_ANSWERS}/${answer_id}/report`,
      method: 'put',
    };

    return axios(options);
  },
};
