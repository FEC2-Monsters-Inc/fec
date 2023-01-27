const model = require('../models').cart;

module.exports = {
  getCartItems: (req, res) => {
    model.getCartItems()
      .then(results => res.status(200).send(results.data))
      .catch(err => {
        console.log('err ctrl.getCartItems: ', err);
        res.sendStatus(500);
      });
  },

  addCartItem: (req, res) => {
    model.addCartItem(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => {
        console.log('err ctrl.addCartItem: ', err);
        res.sendStatus(500);
      });
  }
};