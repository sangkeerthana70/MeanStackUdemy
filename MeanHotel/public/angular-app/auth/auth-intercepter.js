/* global angular*/
angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };
    
    function request(config) {
        config.headers = config.headers || {};//if config.headers exists use that or use an empty object.
        if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }
    
    function response(response) {
        if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {//if response.status is 200 and token exists and we are not logged in
            AuthFactory.isLoggedIn = true;  //set it to true, AuthFactory comes from auth-factory.js  
        } 
        if (response.status === 401) {//status 401 is unauthorized.
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);//return response or call $q when we have a response
    }
    
    function responseError(rejection) {//handle response error.
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}