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
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, reviewTestService, user_sessionsService, user_sessionsByUserIDService, gradeTestService) {
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

		var userQuestions = gradeTestService.getQuestions(); //RETRIEVE THE QUESTIONS IN THE USER'S TESTING SESSION
		var userAnswers = gradeTestService.getUserAnswers(); //RETRIEVE THE ANSWERS FROM THE USER'S TESTING SESSION
        $scope.userQuestions = userQuestions;
        $scope.userAnswers = userAnswers;

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
		};																					/*DOES NOT CHECK FOR DRAG-N-DROP (INPUT TYPE TEXT); GRAPHING QUESTIONS*/

		//Dealing with question load/display
		$scope.loadSessions = function() {
			user_sessionContainer.user_sessions = user_sessionsByUserIDService.query( // Use query() instead of get() because result will be an array
				{userID: Authentication.user._id},
				function() {
				//console.log("user_sessionContainer sessions inside: " + user_sessionContainer.user_sessions);
					reviewTestService.setUser_sessions(user_sessionContainer.user_sessions);		// Save the questions locally
				//console.log("user_sessionContainer sessions inside after: " + user_sessionContainer.user_sessions);
					$scope.oldTests.tests = user_sessionContainer.user_sessions;	// Make the questions available to the front-end
					//^^^^^^^^^^^^^^^^^^^^^^^^^CHANGE THIS LINE TO BE THE NAMES OF THE TESTS ASSOCIATED WITH SESSIONS
				}
			);
		};

	}
]);