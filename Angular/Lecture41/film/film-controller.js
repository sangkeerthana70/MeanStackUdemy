/*global  angular*/
angular.module('myApp').controller('FilmController', FilmController);

function FilmController($http, $routeParams) {
    console.log("I am here");
    var vm = this;
    var id = $routeParams.id;
    console.log($routeParams.id);
    $http.get('https://swapi.co/api/films/' + id).then(function(response) {
        vm.film = 
        {'title':response.data.title,
         'opening_crawl':response.data.opening_crawl
        };
        
        console.log(response.data.title);
        console.log(response.data.opening_crawl);
    });
}
