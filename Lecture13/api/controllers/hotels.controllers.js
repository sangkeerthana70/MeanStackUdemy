var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    console.log("Get the hotels");
        res
            .status(200)
            .json( hotelData );
};

module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
    console.log("Get hotelID", hotelId);
        res
            .status(200)
            .json( thisHotel );//changing the res.send to a individual hotel instead of
            //sending the whole hotelData as json object as we did before.
};            
            
            