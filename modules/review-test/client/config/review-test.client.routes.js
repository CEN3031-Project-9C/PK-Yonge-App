'use strict';

// Setting up route

angular.module('review-test').config(['$stateProvider',
  function ($stateProvider) {
    //state routing
    $stateProvider
      .state('review-test', {
        url: '/examHistory',
        templateUrl: 'modules/review-test/client/views/review-test.client.view.html',
         data: {
          roles: ['user', 'admin']
        }
      })
      .state('view-specific-test', {
        url: '/grade',
        templateUrl: 'modules/review-test/client/views/review-specific-test.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);