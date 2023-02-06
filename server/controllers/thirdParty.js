const model = require('../models').thirdParty;

module.exports = {
  uploadImage: (req, res) => {
    model.uploadImage(req.body.imgPath)
      .then((data) => res.status(200).send(data.url))
      .catch((err) => {
        console.error('err ctrl.upLoadImage: ', err);
        res.status(500).send(err);
      });
  },

  postImage: (req, res) => {
    model.uploadImage_2(req.file)
      .then(({ data }) => res.status(200).send(data))
      .catch((err) => {
        console.error('err ctrl.postImage: ', err);
        res.sendStatus(500);
      });
  },
};
