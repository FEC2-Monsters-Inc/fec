const model = require('../models').questions;

module.exports = {
  getQuestionsForProduct: (req, res) => {
    model.getQuestionsByProductId(req.params.product_id)
      .then(results => res.status(200).send(results.data))
      .catch(err => console.log('err ctrl.getQuestionsForProduct: ', err));
  }

};