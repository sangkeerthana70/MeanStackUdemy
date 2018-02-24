
/* global angular*/
/*
angular.module('meanhotel').directive('hotelRating', hotelRating);

//custom directive using angular to display stars instead of numbers
function hotelRating() {
    return {
        restrict: 'E', //restrict the directive to be used as an element
        template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
        bindToController: true,
        controller: 'HotelController',
        controllerAs: 'vm',
        scope: {
            stars: '@'
        }
    };
}
*/
angular.module('meanhotel').component('hotelRating', {
   bindings: {
       stars: '='
   },
   template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
   controller: 'HotelController',
   controllerAs: 'vm',
});


