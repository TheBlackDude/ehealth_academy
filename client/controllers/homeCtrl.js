(function () {
    'use strict';

    angular.module('eHA.home')
    .controller('HomeCtrl', ['$scope', function ($scope) {
        var vm = this;

        vm.hello = 'Welcome to eHealth Academy';
    }]);

})();
