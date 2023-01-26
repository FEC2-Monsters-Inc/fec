const model = require('../models').reviews;

module.exports = {
  getReviews: (req, res) => {
    model.getAllReviews()
      .then(results => res.status(200).send(results))
      .catch(err => res.status(400).send(err));
  }
};