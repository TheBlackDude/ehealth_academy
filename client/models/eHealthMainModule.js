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
