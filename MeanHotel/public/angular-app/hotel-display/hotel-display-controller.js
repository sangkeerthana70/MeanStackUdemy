/*global  angular*/
angular.module('meanhotel').controller('HotelController', HotelController);

function HotelController($route, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    vm.isSubmitted = false;
    hotelDataFactory.hotelDisplay(id).then(function(response) {
        console.log("I am HotelController:hotelDisplay");
        vm.hotel = response.data;
        vm.stars = _getStarRating(response.data.stars);
    });
    //helper method to convert the number of stars into an array.
    function _getStarRating(stars) {
        return new Array(stars);
    }
    
    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
          //  console.log("yes. logged in");
            return true;
        }
        else {
        //    console.log("no. not logged in");
            return false;
        } 
    };

    vm.addReview = function() {
        
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;
        
        var postData = {
            name: username,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
                console.log("response from server =" + response.status);
                if (response.status === 200) {
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
        else {
            vm.isSubmitted = true;
        }
    };
}