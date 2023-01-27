const router = require('express').Router();
const controllers = require('./controllers');

/* PRODUCTS */
router.get('/products', controllers.products.getProducts);
router.get('/products/:product_id', controllers.products.getProductById);
router.get('/products/:product_id/related', controllers.products.getRelatedProduct);
router.get('/products/:product_id/styles', controllers.products.getProductStyle);
/* REVIEWS */

/* QUESTIONS */
router.get('/qa/questions', controllers.questions.getQuestions);
router.get('/qa/questions/:question_id/answers', controllers.questions.getAnswers);
router.post('/qa/questions', controllers.questions.addQuestion);

///// STILL IMPLEMENTING THE BELOW COMMENTED OUT ROUTES /////

// router.post('/qa/questions/:question_id/answers', controllers.questions.answerQuestion);
// router.put('/qa/questions/:question_id/helpful', controllers.questions.markHelpfulQuestion);
// router.put('/qa/questions/:question_id/report', controllers.questions.reportQuestion);
// router.put('/qa/answers/:answer_id/helpful', controllers.questions.markHelpfulAnswer);
// router.put('/qa/answers/:answer_id/report', controllers.questions.reportAnswer);

// /* CART */
router.get('/cart', controllers.cart.getCartItems);
router.post('/cart', controllers.cart.addCartItem);

/* INTERACTIONS */
router.post('/interactions', controllers.interactions.addInteraction);

module.exports = router;