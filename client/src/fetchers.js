import axios from 'axios';

const SERVER_BASEURL = 'http://localhost:3000/api';
const BASEURL_QUESTIONS = 'http://localhost:3000/api/qa/questions';
const BASEURL_ANSWERS = 'http://localhost:3000/api/qa/answers';

export default {
  getProductById: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}`,
      method: 'get',
    };

    return axios(options);
  },

  getProductStyle: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}/styles`,
      method: 'get',
    };

    return axios(options);
  },

  getRelatedProduct: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/products/${id}/related`,
      method: 'get',
    };

    return axios(options);
  },

  getReviews: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews`,
      method: 'get',
      params: {
        product_id: id,
        count: 200,
      },
    };

    return axios(options);
  },

  getReviewMeta: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/meta`,
      method: 'get',
      params: {
        product_id: id,
      },
    };

    return axios(options);
  },

  addReviews: (review) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews`,
      method: 'post',
      data: review,
    };

    return axios(options);
  },

  updateUseful: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/${id}/helpful`,
      method: 'put',
    };

    return axios(options);
  },

  updateReport: (id) => {
    const options = {
      url: `${SERVER_BASEURL}/reviews/${id}/report`,
      method: 'put',
    };

    return axios(options);
  },

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

  fetchImageUrls: (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    const options = {
      url: `${SERVER_BASEURL}/images`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };
    return axios(options);
  },
};
