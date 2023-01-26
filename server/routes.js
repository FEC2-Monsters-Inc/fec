const router = require('express').Router();
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);

/* REVIEWS */

/* QUESTIONS */

/* CART */

/* INTERACTIONS */

module.exports = router;