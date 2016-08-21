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
