'use strict';

// Configure the 'choose-test' module routes
angular.module('choose-test').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('choose-test', {
        url: '/choose-test',
        templateUrl: 'modules/choose-test/client/views/choose-test.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
      //.state('choose-test.confirm', {
      //  url: '/choose-test/select/:testSubject',
      //  templateUrl: 'modules/choose-test/client/views/confirm-test.client.view.html'
      //});
  }
]);
