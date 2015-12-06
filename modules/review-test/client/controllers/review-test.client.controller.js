'use strict';

// Review Question controller
angular.module('review-test').controller('ReviewController', [
	'$scope', 
	'$window', 
	'$document',
	'$stateParams', 
	'$location',
	'$modal',
	'$log', 
	'Authentication', 
	'User_sessions', // Include "User_sessions" model
	'sessionServiceV2',
	'reviewTestService',
	'user_sessionService', 
	'user_sessionsByUserIDService',
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionServiceV2, reviewTestService, user_sessionService, user_sessionsByUserIDService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

		var user_sessionContainer = {
			user_sessions: [],	// we will store retrieved sessions in this array
			// answers: [],	// we will store the user's answers in this array
			// review: [],		// we will store whether or not questions are marked for review in this array
			// notes: []		// we will store the notes for the selected question in this array
		};
		
		$scope.oldTests = {
			tests: []
		};

		//Dealing with question load/display
		$scope.loadSessions = function() {
						
			user_sessionContainer.user_sessions = user_sessionsByUserIDService.query( // Use query() instead of get() because result will be an array
				{userID: sessionServiceV2.getUserID()},
				function() {

					reviewTestService.setUser_sessions(user_sessionContainer.user_sessions);		// Save the questions locally

					$scope.oldTests.tests = user_sessionContainer.user_sessions;	// Make the questions available to the front-end
					//^^^^^^^^^^^^^^^^^^^^^^^^^CHANGE THIS LINE TO BE THE NAMES OF THE TESTS ASSOCIATED WITH SESSIONS
				}
			);
			
		};

		$scope.loadTests = function() {
						
			user_sessionContainer.user_sessions = user_sessionsByUserIDService.query( // Use query() instead of get() because result will be an array
				{userID: sessionServiceV2.getUserID()},
				function() {

					reviewTestService.setUser_sessions(user_sessionContainer.user_sessions);		// Save the questions locally
					
					$scope.oldTests.tests = user_sessionContainer.user_sessions;	// Make the questions available to the front-end
					//^^^^^^^^^^^^^^^^^^^^^^^^^CHANGE THIS LINE TO BE THE NAMES OF THE TESTS ASSOCIATED WITH SESSIONS
				}
			);
			
		};

    }
]);
	}
]);
