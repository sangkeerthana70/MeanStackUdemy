var express = require("express");
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

router
    .route('/hotels')//chain the router to the route in app.js
    .get(ctrlHotels.hotelsGetAll);
    
router
    .route('/hotels/:hotelId')//chain the router to the route in app.js
    .get(ctrlHotels.hotelsGetOne);
    
router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne);

//Review routes 


router
    .route('/hotels/:hotelId/reviews')//chain the router to the route in app.js
    .get(ctrlReviews.reviewsGetAll);
    
router
    .route('/hotels/:hotelId/reviews/:reviewId')//chain the router to the route in app.js
    .get(ctrlReviews.reviewsGetOne);


module.exports = router;