'use strict';

// Setting up route
angular.module('test_portal').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('question', {
        abstract: true,
        url: '/questions',
        template: '<ui-view/>'
      })
      .state('question.list', {
        url: '',
        templateUrl: 'modules/test_portal/client/views/list-questions.client.view.html'
      });
  }
]);
