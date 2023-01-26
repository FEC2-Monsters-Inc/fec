const model = require('../models').products;

module.exports = {
  getProducts: (req, res) => {
    model.getProducts()
      .then(results => res.status(200).send(results.data))
      .catch(err => console.log('error getProducts: ', err));
  },

  getProductById: (req, res) => {
    model.getProductById(req.params.product_id)
      .then(results => res.status(200).send(results.data))
      .catch(err => console.log('error getProductById: ', err));
  }
};