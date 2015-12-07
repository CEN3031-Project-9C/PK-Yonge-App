'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller(
	'ChooseTestController', [
	'$scope', 
	'$state', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'User_Sessions', 
	'sessionServiceV3',
	function ($scope, $state, $stateParams, $location, Authentication, User_Sessions, sessionServiceV3) {
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
				   testID = "",
				   userID = Authentication.user._id;	
			
			// Assign test ID based off the user's test selection
			if(testSelection === "A1") {
				testID = Math.random() < 0.5 ? "561d18b353e79828251379f8" : "561d1a21ffee344c272568d4"; // Randomly choose b/w test 1 and test 2 for Alg 1
			} else if(testSelection === "A2") {
				testID = "561d199f41c840c42134a825";	// Use the only test for Alg 2
			} else {
				return;
			}
			
			for(var i = 0; i < numberOfQuestions; i++) {
			   userStringTemp.push("");
			   userBoolTemp.push(false);
			}
			
			var user_session = new User_Sessions({		// Create new Session object
			   user_id: userID,
			   test_id: testID,							// Set test ID to the test ID
			   time: 0, 								// Elapsed time (int)
			   complete: false, 						// Test state (boolean)
			   user_notepad: userStringTemp, 			// Create empty string array
			   user_answer: userStringTemp, 			// Create empty string array
			   review: userBoolTemp,					// Create empty boolean array
			   correct: userBoolTemp
			});
			
			/*
			console.log("user_session object (of type User_Sessions) Prior to .$save");
			console.log(user_session);
			*/
			
			user_session.$save(function (response) {
				
				console.log("success portion...");
				
				//sessionServiceV3.setSessionObject(user_session); // Cannot assign object reference at this point for some reason
						
				sessionServiceV3.setSessionID(user_session._id);	// Make session ID available to other services/controllers
				sessionServiceV3.setTestID(testID);	// Make the test ID available to other services/controllers
				sessionServiceV3.setUserID(userID);

				$state.go('view-question');	// Change state to question View

			}, function (errorResponse) {
				console.log("error portion...");
				$scope.error = errorResponse.data.message;
			});
		
			/*
			console.log("sessionContainer.session following initial assignment");
			console.log(sessionServiceV3.getSessionObject());

			user_session.complete = true;
			user_session.user_notepad = ["nothing", "something else"];

			console.log("user_session object (of type User_Sessions) post notepad and complete update");
			console.log(user_session);

			user_session.user_notepad.push("My 3rd note!");
		
			console.log("user_session object (of type User_Sessions) post second notepad update");
			console.log(user_session);
		
			sessionServiceV3.setSessionObject(user_session);
			console.log("sessionContainer.session following re-assignment");
			console.log(sessionServiceV3.getSessionObject());
			*/
			
			//console.log("setting notepad in user_session...");
			//user_session.user_notepad = ["hello", "this is a test...", "AGAIN."];
			
			//console.log("setting notepad in sessionServiceV3...");
			//sessionServiceV3.setSessionNotepad(["hello", "again", "this is a test"]);
			
			//console.log("user_session contents:");
			//console.log(user_session);
			
			//console.log("setting review flags in sessionServiceV3...");
			//sessionServiceV3.setReviewFlags([true, false, false, true, true, true, true]);
			
			sessionServiceV3.setSessionObject(user_session);
			console.log(sessionServiceV3.getSessionObject());
			
			// sessionServiceV3.setUserNotepad(["4", "number four", "Fore!"]);
			
			// sessionServiceV3.setUserAnswers(["Answer 1", "Is this right?", "Hmm..."]);
			
		};
		
	}
]);
