var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    
    var db = dbconn.get();
    var collection = db.collection('hotels');
    
    var offset = 0;
    var count = 5;
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);//to parse the returned string
        //into a number.
    }
    
    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs) {
            console.log("Found hotels", docs);
        res
            .status(200)
            .json(docs);   
        });
    
};  
    
   
   
module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    
    var hotelId = req.params.hotelId;
    console.log("Get hotelID", hotelId);
    
    collection 
        .findOne({
            _id : ObjectId(hotelId)//parsing in var hotelId = req.params.hotelId;
        }, function(err, doc) {
             res
                .status(200)
                .json( doc );//changing the res.send to a individual hotel instead of
                //sending the whole hotelData as json object as we did before.
        });
   
 };       

module.exports.hotelsAddOne = function(req, res){
    console.log("POST new hotel");
    console.log(req.body);//the body-parser middleware will parse out all the data from the posted form to the req.body.
    res
            .status(200)
            .json(req.body);
};
            
            