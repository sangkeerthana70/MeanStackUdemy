var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');//reference to the model that interacts with the database.

module.exports.hotelsGetAll = function(req, res) {
    
    var offset = 0;
    var count = 5;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);//to parse the returned string
        //into a number.
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }
    
    console.log(Hotel.find());
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            if (err) throw err;
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);
        });

};  

module.exports.hotelsGetOne = function(req, res) {
    
    var hotelId = req.params.hotelId;
    console.log("Get hotelID", hotelId);
    
    Hotel 
        .findById(hotelId)
        .exec(function(err, doc) {
            if (err) throw err;
             res
                .status(200)
                .json( doc );//changing the res.send to a individual hotel instead of
                //sending the whole hotelData as json object as we did before.
        });
   
 };       

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
  
    console.log("POST new hotel");
    
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        //console.log(newHotel);//the body-parser middleware will parse out all the data from the posted form to the req.body.
        collection.insertOne(newHotel, function(err,response){
                console.log(response);
                console.log(response.ops);
                res
                    .status(201)
                    .json(response.ops);
            });
        
     }
    else {
        console.log("Data missing from the body");
        res
            .status(400)
            .json({message: "Required data missing from body"});
    }
};
    
            
            