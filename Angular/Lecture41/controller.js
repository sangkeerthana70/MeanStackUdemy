/*global  angular*/
angular.module('myApp').controller('MainController', MainController).controller('FilmController', FilmController);

function MainController($http) {//$http service goes to webservers endpoint and gets back data
    var vm = this;
    vm.name = 'Anuradha';
    $http.get('https://swapi.co/api/films/').then(function(response) {
        vm.films = response.data.results;
        console.log(response.data.results);
    });
}


function FilmController($http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    $http.get('https://swapi.co/api/films/' + id).then(function(response) {
        vm.film = response.data.results;
        
    });
}




