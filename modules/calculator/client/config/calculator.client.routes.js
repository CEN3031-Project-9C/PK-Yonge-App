'use strict';

// Configure the 'calculator' module routes
//credit to Tom Porter

angular.module('calculator').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('calculator', {
        url: '/calculator',
        templateUrl: 'modules/calculator/client/views/calculator.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });

      //.state('calculator.confirm', {
      //  url: '/calculator/select/:testSubject',
      //  templateUrl: 'modules/calculator/client/views/confirm-test.client.view.html'
      //});
  }
]);
