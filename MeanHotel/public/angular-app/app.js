/*global  angular  HotelsController  HotelController RegisterController*/
angular.module('meanhotel', ['ngRoute']).config(config);//modified the app.js to configure a single route now

function config($routeProvider) {//a built in angular service where we define routes.
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/welcome.html'
        })
        .when('/hotels', {
            //template: "<h1>I am here</h1>"
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm'
        })
        .when('/hotel/:id', {
            templateUrl: 'angular-app/hotel-display/hotel.html',
            controller: HotelController,
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
    }

