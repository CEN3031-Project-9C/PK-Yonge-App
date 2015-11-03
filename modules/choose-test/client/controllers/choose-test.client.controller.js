'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller('ChooseTestController', ['$scope', '$location', 'Authentication',
  function ($scope, $location, Authentication) {

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
     $location.path('/');
    }

  }
]);
