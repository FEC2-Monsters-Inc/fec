const model = require('../models').products;

module.exports = {
  getProducts: (req, res) => {
    model.getProducts()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.getProducts: ', err);
        res.sendStatus(500);
      });
  },

  getProductById: (req, res) => {
    model.getProductById(req.params.product_id)
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.getProductById: ', err);
        res.sendStatus(500);
      });
  }
};