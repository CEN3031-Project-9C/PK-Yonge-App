'use strict';

// Create the 'choose-test' controller
angular.module('take-test').controller(
	'TakeTestController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'User_sessions', 
	'sessionService',
	function ($scope, $state, $stateParams, $location, Authentication, User_sessions, sessionService) {
		
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect back home
		if (!Authentication.user) {
			$location.path('/');
		}
		
				
	}
]);
