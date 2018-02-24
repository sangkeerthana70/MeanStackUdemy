/* global angular*/
angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {
    //console.log("Inside hotelDataFactory");
    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview
    };
    
    function hotelList() {
      return $http.get('/api/hotels?count=10').then(complete).catch(failed);  
    }
    
    function hotelDisplay(id) {
        return $http.get('/api/hotels/' + id).then(complete).catch(failed);
    }
    
    function postReview(id, review) {//this function goes to the route in /routes/index.js .post(ctrlReviews.reviewsAddOne) method where we can post a review.
        return $http.post('/api/hotels/' + id + '/reviews' + review).then(complete).catch(failed);
    }
    
    function complete(response) {
        return response.data;
    }
    
    function failed(error) {
        console.log(error.statusText);
    }
}