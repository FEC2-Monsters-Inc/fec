const model = require('../models').interactions;

module.exports = {
  addInteraction: (req, res) => {
    model.addInteraction(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.log('err ctrl.addInteraction: ', err);
        res.sendStatus(422);
      });
  }
};