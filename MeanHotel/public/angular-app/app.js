/*global  angular  HotelsController  HotelController RegisterController*/
angular.module('meanhotel', ['ngRoute', 'angular-jwt']).config(config).run(run);//modified the app.js to configure a single route now

function config($httpProvider,$routeProvider) {//a built in angular service where we define routes.
    $httpProvider.interceptors.push('AuthInterceptor');//use AuthInterceptor to intercept http requests.
    
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/main/welcome.html',
            access: {
                restricted: false
            }
        })
        .when('/hotels', {
            //template: "<h1>I am here</h1>"
            templateUrl: 'angular-app/hotel-list/hotels.html',
            controller: HotelsController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/hotel/:id', {
            templateUrl: 'angular-app/hotel-display/hotel.html',
            controller: HotelController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
        .when('/profile', {//restricted path, user cannot access their profile unless logged in.
            templateUrl: 'angular-app/profile/profile.html',
            access: {
                restricted: true
            }
        })
        .otherwise({
            redirectTo: '/'
        });
    }
    
function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}

