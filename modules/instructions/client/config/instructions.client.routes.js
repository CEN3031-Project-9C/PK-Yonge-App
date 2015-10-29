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
      templateUrl: 'modules/instructions/client/views/instructions.client.view.html'
    });
  }
]);
