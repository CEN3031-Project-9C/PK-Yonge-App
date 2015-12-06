'use strict';

// Setting up route
angular.module('review-test').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('view-tests.list', {
        abstract: true,
        url: '/examHistory',
        template: 'modules/post-test/client/views/post-test.client.view'
         data: {
          roles: ['user', 'admin']
        }
      })
      .state('view-past-test', {
        url: '/pastExam',
        templateUrl: '<ui-view/>'
      });
  }
]);
