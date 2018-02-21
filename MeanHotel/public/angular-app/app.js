/*global  angular*/
angular.module('meanhotel', ['ngRoute'])
.config(config)
.controller('HotelsController', HotelsController);

function config($routeProvider) {//a built in angular service where we define routes.
    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/hotels.html',
        controller: HotelsController,
        controllerAs: 'vm'
    });
}

function HotelsController() {
    var vm = this;
    vm.title = 'MEAN Hotel App';
}