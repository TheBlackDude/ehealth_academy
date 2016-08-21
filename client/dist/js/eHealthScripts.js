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
