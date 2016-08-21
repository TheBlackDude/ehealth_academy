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

    angular.module('eHA.authentication')
    .factory('Authentication', ['$location','$http', function($location, $http) {
        var Authentication = {
                register: register,
                login: login,
                logout: logout
        };

        function register(email,username,password) {
            var Email = email;
            var Password = password;
            return $http.post('/api/accounts/', {
                    email: email,
                    username: username,
                    password: password
            }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                     Authentication.login(Email, Password);
            }

            function registerErrorFn(data, status, headers, config) {
                     console.error('Registration Failure!');
            }
        }

        function login(email, password) {
            return $http.post('/api/auth/login/', {
                    email: email,
                    password: password
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {
                     $location.url('/');
            }

            function loginErrorFn(data, status, headers, config) {
                     console.error('Login Failure!', data.error);
            }
        }

        function logout(){
             return $http.post('/api/auth/logout/')
                       .then(logoutSuccessFn, logoutErrorFn);

             function logoutSuccessFn(data, status, headers, config) {
                      $location.url('/');
             }

             function logoutErrorFn(data, status, headers, config) {
                      console.error('Logout Failure!', data.error);
             }
        }

     return Authentication;

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

(function () {
    'use strict';

    angular.module('eHA.authentication')
    .controller('LoginCtrl', ['$location', '$scope', 'Authentication', function($location, $scope, Authentication) {
        var mv = this;

        vm.login = login;

        function login() {
            Authentication.login(vm.email, vm.password);
        }

    }]);

})();

(function () {
    'use strict';

    angular.module('eHA.authentication')
    .controller('RegisterCtrl', ['$location', '$scope', 'Authentication', function($location, $scope, Authentication){
        var vm = this;

        vm.register = register;

        function register() {
            Authentication.register(vm.email,vm.username,vm.password);
        }

     }]);

})();
