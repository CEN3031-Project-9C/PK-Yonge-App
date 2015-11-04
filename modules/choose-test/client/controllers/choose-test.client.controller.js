'use strict';

// Create the 'choose-test' controller
angular.module('choose-test').controller('ChooseTestController', ['$scope', '$stateParams', '$location', 'Authentication', 'User_sessions',
  function ($scope, $stateParams, $location, Authentication, User_sessions) {
  	$scope.authentication = Authentication;
  	
    // If user is not signed in then redirect back home
    if (!Authentication.user) {
     $location.path('/');
    }
	
    // Create new User_sessions object
     $scope.create = function (isValid) {
       $scope.error = null;
       
       var numberOfQuestions = 10,
       	userStringTemp = [],
       	userBoolTemp = [];	
       
       for(var i = 0; i < numberOfQuestions; i++) {
	       userStringTemp.push("");
	       userBoolTemp.push(false);
	   }
       
       var user_session = new User_sessions({		// Create new Session object
	       test_id: "561d18b353e79828251379f8",		// Hardcode for testing/demo purposes. Randomly generate it in the future for randomized questions.
	       time: 0, 								// Elapsed time (int)
	       complete: false, 						// Test state (boolean)
	       user_notepad: userStringTemp, 			// Create empty string array
	       user_answer: userStringTemp, 			// Create empty string array
	       review: userBoolTemp 					// Create empty boolean array
       });

	   user_session.$save(function (response) {
	   		// do something?
       }, function (errorResponse) {
         $scope.error = errorResponse.data.message;
       });

     };
	
  }
]);
