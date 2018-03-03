/*global  angular*/
angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    console.log("HotelsController");
    var vm = this;
    vm.title = 'MEAN Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        console.log(response);
        console.log(response.data);
        vm.hotels = response.data;
        //add the hotel property to the view model.
    });
}