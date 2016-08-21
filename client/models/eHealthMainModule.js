(function () {
    'use strict';
    
    angular.module('eHA', [
            'eHA.config',
            'eHA.routes',
            'eHA.authentication'
            ]);

    angular.module('eHA.config', []);
    angular.module('eHA.routes', ['ngRoute']);
    angular.module('eHA.authentication', []);
})();
