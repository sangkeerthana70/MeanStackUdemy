/*global angular*/
angular.module('meanhotel').controller('RegisterController', RegisterController);

function RegisterController($http) {
    var vm = this;
    
    vm.register = function() {
        console.log("In RegisterController");
        var user = {//create an object to get the user information from the forms
            username: vm.username,
            password: vm.password
        };
        
        //pass the above information about the user to the backend.
        if (!vm.username || !vm.password) {
            vm.error = 'Please add a username and password.';
        }
        else {
            if (vm.password !== vm.passwordRepeat) {
                vm.error = 'Please make sure the passwords match.';
            }
            else {
                console.log("Making ajax call");
                $http.post('/api/users/register', user).then(function(result) {//passing the object created above(in line8)
                    console.log(result);
                    vm.message = 'Successful registration, please login.';
                    vm.error = '';
                }).catch(function(error) {
                    console.log(error);
                });
            }
        }
    };
}
