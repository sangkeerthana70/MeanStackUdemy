/*global  angular*/
angular.module('myApp').controller('MainController', MainController);

function MainController($http) {//$http service goes to webservers endpoint and gets back data
    var vm = this;
    vm.name = 'Anuradha';
    $http.get('https://swapi.co/api/films/').then(function(response) {
        vm.films = response.data.results;
        console.log(response.data.results);
    });
}
