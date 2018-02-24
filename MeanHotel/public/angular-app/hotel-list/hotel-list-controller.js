/*global  angular*/
angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    console.log("HotelsController");
    var vm = this;
    vm.title = 'MEAN Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        console.log(response);
        vm.hotels = response;
        //add the hotel property to the view model.
    });
}