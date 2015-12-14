//Pulls appropriate information from database and sets the sessionServiceV3 object so that this information can be read by other modules.
'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller(
	'ChooseTestController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'User_Sessions', 	// Pass REST endpoint service (from userSessions.client.service.js) as a parameter
	'sessionServiceV3', // Pass sessionServiceV3 service (from sessionServiceV3.client.service.js) as a parameter
	//Pass these parameters in the same order into the below function
	function ($scope, $state, $stateParams, $location, Authentication, User_Sessions, sessionServiceV3) {
		
		//Allows access to the current signed-in instance
		$scope.authentication = Authentication;		
		// If user is not signed in, then redirect back home
		if (!Authentication.user) {
			$location.path('/');
		}
		
		// Function called when user selects a test subject (from /choose-test page)
		$scope.startTest = function (testSelection) {
			$scope.error = null;						// Reset error flag
			var numberOfQuestions = 10,					// Instantiate blank test object (to be saved as "user_session" in MongoDB)
				   userStringTemp = [],
				   userBoolTemp = [],
				   testID = "",
				   userID = Authentication.user._id;	
			
			// Assign test ID based off the user's test selection
			if(testSelection === "A1") {
				testID = Math.random() < 0.5 ? "561d18b353e79828251379f8" : "561d1a21ffee344c272568d4"; // Randomly choose b/w test 1 and test 2 for Alg 1, strings are Test IDs
			} else if(testSelection === "A2") {
				testID = "561d199f41c840c42134a825";	// Use the only test for Alg 2
			} else {
				return;
			}
			
			for(var i = 0; i < numberOfQuestions; i++) {
			   userStringTemp.push("");						// Populate string array
			   userBoolTemp.push(false);					// Populate boolean array
			}
			
			var user_session = new User_Sessions({		// Create new Session object
			   user_id: userID,							// Set user ID to the user's ID
			   test_id: testID,							// Set test ID to the test ID
			   time: 0, 								// Elapsed time (int)
			   complete: false, 						// Test state (boolean)
			   user_notepad: userStringTemp, 			// Create empty string array
			   user_answer: userStringTemp, 			// Create empty string array
			   review: userBoolTemp,					// Create empty boolean array
			   correct: userBoolTemp
			});
			
			user_session.$save(function (response) {	// Save the blank test object (a "user_session") to the database
						
				sessionServiceV3.setSessionID(user_session._id);	// Make session ID available to other services/controllers
				sessionServiceV3.setTestID(testID);	// Make the test ID available to other services/controllers by saving it to the object in sessionServiceV3
				sessionServiceV3.setUserID(userID);	// Make user ID available to other services/controllers

				$state.go('view-question');	// Change state to question View

			}, function (errorResponse) {
				console.log("error portion...");
				$scope.error = errorResponse.data.message;	// Display error message if there is one (this might not be rendering in the view, however, as it is just langauge copied over from the Articles module)
			});
			
			sessionServiceV3.setSessionObject(user_session);	// Save entire test object (again, technically a "user_session" according to the collection in Mongo)
			//console.log(sessionServiceV3.getSessionObject());		// For testing, print the entire test object (and all of its properties) to the console
			
		};
		
	}
]);
