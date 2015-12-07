'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      /*$injector.get('$state').transitionTo('not-found', null, {
        location: false
      });*/
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('about', {
      url: '/about',
      templateUrl: 'modules/core/client/views/about.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('resources', {
      url: '/resources',
      templateUrl: 'modules/core/client/views/resources.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('tests', {
      url: '/tests',
      templateUrl: 'modules/core/client/views/tests.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'modules/core/client/views/contact.client.view.html',
      data: {
        ignoreState: true
      }
    })
        .state('instructions', {
      url: '/instructions',
      templateUrl: 'modules/core/client/views/instructions.client.view.html',
      data: {
        ignoreState: true
      }
    })

    .state('access', {
      url: '/instructions/access',
      templateUrl: 'modules/core/client/views/access.client.view.html',
      data: {
        ignoreState: true
      }
    })
     .state('signIn', {
      url: '/instructions/signIn',
      templateUrl: 'modules/core/client/views/signIn.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('features', {
      url: '/instructions/features',
      templateUrl: 'modules/core/client/views/features.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('types', {
      url: '/instructions/types',
      templateUrl: 'modules/core/client/views/types.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('end', {
      url: '/end',
      templateUrl: 'modules/test_portal/client/views/end.client.view.html',
      data: {
        ignoreState: true
      }
    })

    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
