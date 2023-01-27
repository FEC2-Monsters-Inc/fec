const router = require('express').Router();
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);
router.get('/products/:product_id/related', controllers.products.getRelatedProduct);
router.get('/products/:product_id/styles', controllers.products.getProductStyle);
/* REVIEWS */
router.get('/reviews', controllers.reviews.getReviews);
router.post('/reviews', controllers.reviews.addReviews);
router.post('/reviews', controllers.reviews.addReviews);
router.put('/reviews/:review_id/helpful', controllers.reviews.updateUseful);
router.put('/reviews/:review_id/report', controllers.reviews.updateReport);
/* QUESTIONS */

/* CART */

/* INTERACTIONS */

module.exports = router;