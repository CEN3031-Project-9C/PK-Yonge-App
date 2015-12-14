'use strict';

// Questions controller
angular.module('review-test').controller('ReviewController', [
	'$scope', 
	'$window', 
	'$document',
	'$stateParams', 
	'$location',
	'$modal',
	'$log', 
	'Authentication', 
	'reviewTestService',
	'user_sessionsService', 
	'user_sessionsByUserIDService',
	'gradeTestService',
	//Pass these parameters in the same order into the below function
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, reviewTestService, user_sessionsService, user_sessionsByUserIDService, gradeTestService) {
		
		//Allows access to the current signed-in instance
		$scope.authentication = Authentication;
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

		//(these were set to the Service object in the test_portal module's QuestionsController.client.controller.js)
		var userQuestions = gradeTestService.getQuestions(); //RETRIEVE THE QUESTIONS IN THE USER'S TESTING SESSION
		var userAnswers = gradeTestService.getUserAnswers(); //RETRIEVE THE ANSWERS FROM THE USER'S TESTING SESSION
		//set variables that can be accessed by the view
        $scope.userQuestions = userQuestions;
        $scope.userAnswers = userAnswers;

		//used to find & display previous tests/sessions that a user has taken (for review-test.client.view.html, which is not currently in use bc we couldn't finish its functionality.)
		var user_sessionContainer = {
			user_sessions: []	// we will store retrieved sessions in this array
		};
		$scope.oldTests = { 
			tests: []
		};

		/*
		GRADE THE LOADED TESTING SESSION FUNCTION
		TOTAL === NUMBER OF QUESTIONS FOR THE EXAM
		CORRECT === NUMBER OF CORRECT ANSWERS
		CORRECT_ANSWER: ATTRIBUTE NAME IN MONGOLAB DOCUMENT

			CHECKS THE TESTING SESSION ITERATIVELY

			BEGIN
				1) CHECK THE QUESTION TYPE
				2) COMPARE VALUES FROM THE TEST TAKER TO THE VALUES IN THE DB
				3) INCRMT CORRECT IF THE SAME ELSE NOTHING
			END

			RETURN THE CORRECT/TOTAL

			NOTE: WHEN CHECKING CHECKBOX/MULTI-FILLINBLANKS/(ANY EMPTY INPUT FIELDS) QUESTION TYPES, UNCHECKED CHECKBOXES/(EMPTY INPUT FIELDS) WILL BE DECLARED AS FALSE OR UNDEFINED
		*/
		$scope.gradeTest = function() {
			var total = userQuestions.length;
			var correct = 0;
            
			for (var i = 0; i < userQuestions.length; i++){

                if (userQuestions[i].question_type === "multiple_choice"){
				    if (String(userAnswers[i]) === userQuestions[i].correct_answer[0]){
				    	correct++;
				    }
			    }

			    else if (userQuestions[i].question_type === "check"){
			    	var checkOptions = 0;
			    	for (var j = 0; j < userQuestions[i].correct_answer.length; j++){
				        if (userQuestions[i].correct_answer[j] === "false"){
				    	    if (userAnswers[i][j] === undefined){
				    	        checkOptions++;
				    	    }
				    	    else if (String(userAnswers[i][j]) === "false"){
				    	    	checkOptions++;
				    	    }
				        }
				        else if (userQuestions[i].correct_answer[j] === "true" && userAnswers[i] !== undefined) {
				        	if (String(userAnswers[i][j]) === "true"){
                                checkOptions++;
                            }
				        }

				        if (checkOptions === userQuestions[i].correct_answer.length){
                          correct++;
				        }
				    }
			    }

			    else{
			    	var fillOptions = 0;
			    	for (var k = 0; k < userQuestions[i].correct_answer.length; k++){
				        if (userAnswers[i] === undefined){
				        }
				        else if (userQuestions[i].correct_answer[k] === String(userAnswers[i][k])) {
                                fillOptions++;
				        }

				        if (fillOptions === userQuestions[i].correct_answer.length){
                          correct++;
				        }
				    }
			    }

			}
            
			var result = String(correct)+"/"+String(total);
			return result;
		};

        $scope.handleQuestion = function(response, type, length) { /* MANAGE QUESTIONS BY QUESTION TYPE MAY NEED TO UPDATE DEPENDING OF NUMBER ANSWER CHOICES PROVIDED BY CLIENT::SHELTON */
        	if (type === "multiple_choice"){					   /* RE-DECLARE VALUES FROM INT TO ANSWER CHOICE LETTER FOR MULTIPLE CHOICE && CHECKBOX */
				if (response === undefined){
					return "";
				}
				else if (response === "0"){
	                return "A";
				}
				else if (response === "1"){
	                return "B";
				}
				else if (response === "2"){
	                return "C";
				}
				else if (response === "3"){
	                return "D";
				}
				else if (response[0] === "0"){
	                return "A";
				}
				else if (response[0] === "1"){
	                return "B";
				}
				else if (response[0] === "2"){
	                return "C";
				}
				else if (response[0] === "3"){
	                return "D";
				}
		    }
		    else if (type === "check"){
		    	if (response === undefined){
		    		return "";
		    	}
		    	else{
		    		var returningCheck = "";
		    		for (var i = 0; i < length; i++){
		    			if (response[i] === undefined){
		    				returningCheck += " ";
		    			}
		    			else if (response[i] === "false"){
                            returningCheck += " ";
		    			}
		    			else if (String(response[i]) === "true"){
			    			if (i === 0){
				                returningCheck += "A ";
							}
							else if (i === 1){
				                returningCheck += "B ";
							}
							else if (i === 2){
				                returningCheck += "C ";
							}
							else if (i === 3){
				                returningCheck += "D ";
							}
					    }
		    		}
		    		return returningCheck;
		    	}
		    }
		    else{																			/*MATCH STUDENT ANS CHOICE WITH DB DATA*/
		    	var returningFill = "";														/*INPUT TYPES: TEXT */

		    	if (response === undefined){
                    return returningFill;
		    	}
		    	else{
		    		for (var j = 0; j < length; j++){
		    			if (response[j] === undefined){
		    				returningFill += "nothing was entered!";
		    			}
		    			else{
                            returningFill += response[j];
                        }
                        returningFill += " ";
                    }
                    return returningFill;
		    	}
		    }
		};	
		/*DOES NOT CHECK FOR DRAG-N-DROP (INPUT TYPE TEXT); GRAPHING QUESTIONS*/

		//To load all previous sessions completed by a user (for review-test.client.view.html, which is not currently in use bc we couldn't finish its functionality.)
		//communicates a lot with user_sessionsByUserIDService
		$scope.loadSessions = function() {
			user_sessionContainer.user_sessions = user_sessionsByUserIDService.query( // Use query() instead of get() because result will be an array
				{userID: Authentication.user._id}, //passes current signed-in user into the query method
				function() {
					reviewTestService.setUser_sessions(user_sessionContainer.user_sessions);		// Save the sessions locally
					$scope.oldTests.tests = user_sessionContainer.user_sessions;	//RIGHT NOW, IT DISPLAYS SESSION IDS, NOT TEST NAMES.
				}
			);
		};

		/*NEXT STEPS WITH THIS: 
		1) find out how to perform another query that will: use the session IDs that ^this method returns to query for the associated test names. (session document stores test_id, so you'd grab value from that field and query that test_id for the field of the corresponding document that holds its name)
			This would just be for displaying tests in a more user-friendly format than session ID #s.
		2) when user clicks on a test, set appropriate information and reroute them to review-specific-test.client.view.html so that they will see the specific test page for the correct test that they chose.
		*/
	}
]);