var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//Get all reviews for a hotel
module.exports.reviewsGetAll = function(req,res) {
      var hotelId = req.params.hotelId;
      console.log("Get hotelID", hotelId);
    
    Hotel 
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, doc) {
            console.log("Returned doc", doc);
            if (err) throw err;
             res
                .status(200)
                .json( doc.reviews );//changing the res.send to a individual hotel instead of
                //sending the whole hotelData as json object as we did before.
        });
   
 };       
  

//Get single review for a hotel
module.exports.reviewsGetOne = function(req,res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get reviewID " + reviewId + " for hotelId " + hotelId);
    
        Hotel 
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
            console.log("Returned hotel", hotel);
            var review = hotel.reviews.id(reviewId);
            if (err) throw err;
             res
                .status(200)
                .json( review );//changing the res.send to a individual hotel instead of
                //sending the whole hotelData as json object as we did before.
        });
   
 };       

