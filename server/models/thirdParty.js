const imgbbUploader = require('imgbb-uploader');

module.exports = {
  uploadImage: (imgPath) => (
    imgbbUploader({ apiKey: process.env.IMAGE_BB_APIKEY, base64string: imgPath })
  ),
};
