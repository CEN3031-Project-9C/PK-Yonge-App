'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
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
    //.state('signIn', {
      //url: '/signIn',
      //templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
      //data: {
        //ignoreState: true
      //}
    //})
    .state('signOut', {
      url: '/signOut',
      templateUrl: 'api/auth/signout',
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
     //.state('calculator', {
       // url: '/calculator',
        //templateUrl: 'modules/calculator/client/views/calculator.client.view.html',
        //data: {
          //ignoreState: true
          //roles: ['user', 'admin']
        //}
      //})
    .state('question1', {
      url: '/question1',
      templateUrl: 'modules/test_portal/client/views/question1.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('question2', {
      url: '/question2',
      templateUrl: 'modules/test_portal/client/views/question2.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('question3', {
      url: '/question3',
      templateUrl: 'modules/test_portal/client/views/question3.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('question4', {
      url: '/question4',
      templateUrl: 'modules/test_portal/client/views/question4.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('question5', {
      url: '/question5',
      templateUrl: 'modules/test_portal/client/views/question5.client.view.html',
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
