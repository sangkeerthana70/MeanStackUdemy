/*global angular*/
angular.module('meanhotel').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory,jwtHelper) {
    var vm = this;
    
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
    
    vm.login = function() {
        if (vm.username && vm.password) {//send the user object's username and password to the backend.
            var user = {
                username: vm.username,
                password: vm.password
            };
            
            $http.post('/api/users/login', user).then(function(response) {//login the user by calling $http post method and also handle the response and errors.
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
                }
                //console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
        }
    };
    
    vm.logout = function() {
        AuthFactory.isLoggedIn = false;//set logged in to false
        delete $window.sessionStorage.token;//delete token from sessionStorage
        $location.path('/');//take the location and redirect the user to the default route
    };
    
    vm.isActiveTab = function(url) {
       // console.log("url = " + url);
        //console.log("$location.path = " + $location.path());
        var currentPath = $location.path().split('/')[1];
        //console.log("currentPath = " + currentPath);
        //console.log(url === currentPath ? 'active' : '');
        return (url === currentPath ? 'active' : '');
        
    };
}