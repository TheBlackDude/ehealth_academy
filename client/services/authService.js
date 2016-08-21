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
