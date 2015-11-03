'use strict';

// Setting up route
angular.module('instructions').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('instructions', {
      url: '/instructions',
      templateUrl: 'modules/instructions/client/views/instructions.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('access', {
      url: '/instructions/access',
      templateUrl: 'modules/instructions/client/views/access.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('signIn', {
      url: '/instructions/signIn',
      templateUrl: 'modules/instructions/client/views/signIn.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('features', {
      url: '/instructions/features',
      templateUrl: 'modules/instructions/client/views/features.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('questions', {
      url: '/instructions/questions',
      templateUrl: 'modules/instructions/client/views/questions.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
