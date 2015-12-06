'use strict';

// Setting up route
angular.module('review-test').config(['$stateProvider',
  function ($stateProvider) {
    //state routing
    $stateProvider
      .state('view-tests.list', {
        abstract: true,
        url: '/examHistory',
        template: 'modules/post-test/client/views/review-test.client.view',
         data: {
          roles: ['user', 'admin']
        }
      })
      .state('view-specific-test', {
        url: '/grade',
        templateUrl: 'modules/review-specific-test.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
