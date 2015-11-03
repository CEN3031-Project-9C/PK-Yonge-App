'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller('ChooseTestController', ['$scope', '$stateParams', '$location', 'Authentication',
  function ($scope, $stateParams, $location, Authentication) {
  
    // If user is not signed in then redirect back home
    if (!Authentication.user) {
     $location.path('/');
    }

	$scope.testSubject = $stateParams.testSubject;
	
  }
]);
