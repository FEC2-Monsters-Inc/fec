const router = require('express').Router();
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);
router.get('/products/:product_id/related', controllers.products.getRelatedProduct);
router.get('/products/:product_id/styles', controllers.products.getProductStyle);
/* REVIEWS */

/* QUESTIONS */

/* CART */

/* INTERACTIONS */

module.exports = router;