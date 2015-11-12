'use strict';

// Configure the 'take-test' module routes
angular.module('take-test').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('take-test', {
        url: '/take-test',
        templateUrl: 'modules/take-test/client/views/take-test.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
