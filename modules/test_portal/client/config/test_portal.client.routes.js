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
      })
      .state('view-question', {
	      url: 'take-test/view-question',
	      templateUrl: 'modules/test_portal/client/views/view-question.client.view.html',
	      data: {
		    roles: ['user', 'admin']
		  }
	  })
	  .state('take-test', {
        url: '/take-test',
        templateUrl: 'modules/test_portal/client/views/take-test.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
    .state('markForReview', {
        url: 'markForReview-questions',
        templateUrl: 'modules/test_portal/client/views/markForReview.client.view.html',
        data: {
        roles: ['user', 'admin']
      }
    });
  }
]);
