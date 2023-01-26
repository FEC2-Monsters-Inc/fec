const model = require('../models').reviews;

module.exports = {
  getReviews: (req, res) => {
    model.getReviews(req.params.product_id)
      .then(results => {
        .then(results => res.status(200).send(results.data))
        res.status(200).send(results.data);
      })
      .catch(err => console.log('err ctrl.getReviews: ', err));
  }
};