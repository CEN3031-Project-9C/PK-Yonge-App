'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller(
	'ChooseTestController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'User_sessions', 
	'sessionServiceV2',
	function ($scope, $state, $stateParams, $location, Authentication, User_sessions, sessionServiceV2) {
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect back home
		if (!Authentication.user) {
			$location.path('/');
		}
		
		// Function called when user selects a test subject (from /choose-test page)
		$scope.startTest = function (testSelection) {
		
			$scope.error = null;
			
			var numberOfQuestions = 10,
				   userStringTemp = [],
				   userBoolTemp = [],
				   testID = "";	
			
			// Assign test ID based off the user's test selection
			if(testSelection === "A1") {
				testID = Math.random() < 0.5 ? "561d18b353e79828251379f8" : "561d1a21ffee344c272568d4"; // Randomly choose b/w test 1 and test 2 for Alg 1
			} else if(testSelection === "A2") {
				testID = "561d199f41c840c42134a825";
			} else {
				return;
			}
			
			for(var i = 0; i < numberOfQuestions; i++) {
			   userStringTemp.push("");
			   userBoolTemp.push(false);
			}
			
			var user_session = new User_sessions({		// Create new Session object
			   test_id: testID,							// Set test ID to the test ID
			   timer: 0, 								// Elapsed time (int)
			   completed: false, 						// Test state (boolean)
			   user_notepad: userStringTemp, 			// Create empty string array
			   user_answer: userStringTemp, 			// Create empty string array
			   review: userBoolTemp 					// Create empty boolean array
			});
			
			user_session.$save(function (response) {
			
				sessionServiceV2.setSessionID(user_session._id);	// Make session ID available to other services/controllers
				sessionServiceV2.setTestID(testID);	// Make the test ID available to other services/controllers
				$state.go('view-question');	// Change state to question View

			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		
		};
		
	}
]);
