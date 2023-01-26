const router = require('express').Router();
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);

/* REVIEWS */
router.get('/reviews/:product_id', controllers.reviews.getReviews);

/* QUESTIONS */

/* CART */

/* INTERACTIONS */

module.exports = router;