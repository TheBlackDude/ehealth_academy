(function () {
    'use strict';
    
    angular.module('eHA', [
            'eHA.home',
            'eHA.config',
            'eHA.routes',
            'eHA.authentication'
            ]);

    angular.module('eHA.home', []);
    angular.module('eHA.config', []);
    angular.module('eHA.routes', ['ngRoute']);
    angular.module('eHA.authentication', []);
})();

(function () {
    'use strict';

   angular.module('eHA.config')
   .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
   }])
   .run(['$http', function($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
   }]);

})();

(function () {
    'use strict';

    angular.module('eHA.routes')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                templateUrl: '/static/views/home.html'
            })
            .when('/register', {
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                templateUrl: '/static/views/register.html'
            })
            .when('/login', {
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                templateUrl: '/static/views/login.html'
            })
            .otherwise('/');
    }]);

})();

(function () {
    'use strict';

    angular.module('eHA.home')
    .controller('HomeCtrl', ['$scope', function ($scope) {
        var vm = this;

        vm.hello = 'Welcome to eHealth Academy';
    }]);

})();
