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
