var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
// Hotel routes
router
  .route('/hotels')
  .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)//added the users.controllers/authenticate function here(Lecture50).
  .post(ctrlHotels.hotelsAddOne);

router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne);


// Review routes
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne);
  
//authentication routes
router
  .route('/users/register')
  .post(ctrlUsers.register);
  
router
  .route('/users/login')
  .post(ctrlUsers.login);


module.exports = router;