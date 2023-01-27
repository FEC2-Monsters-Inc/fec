const model = require('../models').interactions;

module.exports = {
  addInteraction: (req, res) => {
    let query = {
      element: req.body.element,
      widget: req.body.widget,
      time: req.body.time
    };
    model.addInteraction(query)
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.log('err ctrl.addInteraction: ', err);
        res.sendStatus(422);
      });
  }
};