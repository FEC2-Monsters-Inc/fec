import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api';

export const fetchProductsById = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/products/:product_id`, {
      query: {
        product_id: id,
      },
    });
  } catch (err) {
    return [];
  }
};

export const fetchProductStyle = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/products/:product_id/styles`, {
      query: {
        product_id: id,
      },
    });
  } catch (err) {
    return {};
  }
};

export const fetchReviewMeta = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/reviews/meta`, {
      params: {
        product_id: id,
      },
    });
  } catch (err) {
    return {};
  }
};
