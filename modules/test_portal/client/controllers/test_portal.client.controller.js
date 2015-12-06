'use strict';

// Questions controller
angular.module('test_portal').controller('QuestionsController', [
	'$scope', 
	'$stateParams', 
	'$location',
	'$modal',
	'$log', 
	'Authentication', 
	'User_SessionsTP',
	'sessionServiceV3',
	'questionsService', 
	'questionsByTestIDService',
	'takeTestService',
	function ($scope, $stateParams, $location, $modal, $log, Authentication, User_SessionsTP, sessionServiceV3, questionsService, questionsByTestIDService, takeTestService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}
				
		$scope.currentPage = 0;
		
		$scope.formData = {
			answer: String
		};

		$scope.Notepad = {
			message: String
		};

		$scope.marked = "btn-default";
		$scope.reviewButtonText = "Mark for Review";
		$scope.divwidth = 400;
  		$scope.divheight = 300;
  		$scope.show = true;
  		$scope.divtop = 80;
  		$scope.divleft = 50;
  		$scope.divtop2 = 180;
  		$scope.divleft2 = 150;
		
		$scope.numberOfPages = function() {
			return $scope.testQuestions.questions.length;
		};
		
		var testContainer = {
			questions: [],	// we will store retrieved questions in this array
			answers: [],	// we will store the user's answers in this array
			review: [],		// we will store whether or not questions are marked for review in this array
			notes: []		// we will store the notes for the selected question in this array
		};
		
		$scope.testQuestions = {
			questions: []
		};
				
		$scope.loadQuestions = function() {
						
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionServiceV3.getTestID()},
				function() {

					takeTestService.setQuestions(testContainer.questions);
					$scope.testQuestions.questions = testContainer.questions;
					
				}
			);
			
		};

		//Next 2 methods are code in the body of BOTH previousQuestion and nextQuestion, extracted to be their own methods
		//(if you ever were to edit the code, reduces chance of updating code in one place but not where it's duplicated elsewhere)
		$scope.saveAnswer = function() {
			testContainer.answers[$scope.currentPage] = $scope.formData.answer;

			sessionServiceV3.setUserAnswers(testContainer.answers);
			/*
			// For testing purposes
			console.log("testContainer...");
			console.log(testContainer);
			console.log("testContainer.answers...");
			console.log(testContainer.answers);
			console.log("$scope.formData.answer...");
			console.log($scope.formData.answer);
			*/

			//console.log("My answers: " + sessionServiceV3.getUserAnswers());

			// To-do, save this answer to the DB on question switch
		};
		
		$scope.reloadSaved = function() {
			if(testContainer.answers[$scope.currentPage] !== 0) {
				$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			} else {
				$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			}

			if (testContainer.review[$scope.currentPage] === "btn-danger")
			{
				$scope.marked = "btn-danger";
				$scope.reviewButtonText = "Unmark";
			} else {
				$scope.marked = "btn-default";
				$scope.reviewButtonText = "Mark for Review";				
			}

			$scope.Notepad.message = testContainer.notes[$scope.currentPage];

			//insert code here to also reload marking for notepad , once that is set up
		};
		
		$scope.saveTestSession = function() {
			
			var temp_session = new User_SessionsTP(sessionServiceV3.getSessionObject());
			
			temp_session.userNotepad = ["note 1", "note two", "note threeeee"];
			
			console.log("var temp_session:");
			console.log(temp_session);
			
			/*
			sessionServiceV3.setUserAnswers(["1", "two", "go", "100% yay"]);
			console.log(sessionServiceV3.getSessionObject());
			
			sessionServiceV3.getSessionObject().$update(function (response) {
				
				console.log('Currently "$update"-ing');
								
			}, function(errorResponse) {
				
				$scope.error = errorResponse.data.message;
				
			});
			*/
/*
			console.log('Now in "$scope.saveTestSesion function"');
			console.log('"user_answer" array:');
			console.log(sessionServiceV3.getUserAnswers());
			

			$scope.error = null;
			
			User_sessions.update({_id: sessionServiceV3.getSessionID() }, {
				$set: {
					time: sessionServiceV3.getTime(),
					complete: sessionServiceV3.getComplete(),
					user_notepad: sessionServiceV3.getUserNotepad(),
					user_answer: sessionServiceV3.getUserAnswers(),
					review: sessionServiceV3.getReviewFlags()
				}
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			
			// Get all the user's answers, notes, and review flags
			var temp_session = new User_sessions({
				_id: sessionServiceV3.getSessionID(),
				time: sessionServiceV3.getTime(),
				complete: sessionServiceV3.getComplete(),
				user_notepad: sessionServiceV3.getUserNotepad(),
				user_answer: ["2", "4", "", "x"],	// hardcode value for testing
				//user_answer: sessionServiceV3.getUserAnswers(),
				review: sessionServiceV3.getReviewFlags()
			});

			
			$scope.error = null;
			*/
			temp_session.$update(function (response) {
				
				console.log('Currently "temp_session.$update"-ing');
								
			}, function(errorResponse) {
				
				$scope.error = errorResponse.data.message;
				
			});



		};

		$scope.previousQuestion = function() {
			$scope.showNotes = false;
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)	
			$scope.reloadSaved();
		};
		
		$scope.nextQuestion = function() {
			$scope.showNotes = false;
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage + 1;	// Update pagination (show requested question)
			$scope.reloadSaved();			
		};

		$scope.jumpTo = function(num){
			$scope.showNotes = false;
			$scope.saveAnswer();
			$scope.currentPage = num;
			$scope.reloadSaved();
		};

		$scope.mark_unmark = function() {
			if (testContainer.review[$scope.currentPage] === "btn-default")
			{
				testContainer.review[$scope.currentPage] = "btn-danger";
				$scope.marked = "btn-danger";
				$scope.reviewButtonText = "Unmark";
			}
			else
			{
				testContainer.review[$scope.currentPage] = "btn-default";
				$scope.marked = "btn-default";
				$scope.reviewButtonText = "Mark for Review";
			}

			sessionServiceV3.setReviewFlags(testContainer.review);

			//console.log("My Review: " + sessionServiceV3.getReviewFlags());
		};

		$scope.submitTest = function() {
			//maybe an "are you sure?" alert
			//check to see if any answers[] positions are empty & let them know they have unanswered questions
			//save back to DB
		};
		
		$scope.openCalcWindow = function(){
			var myWindow = window.open("calculator", "calcWindow", "resizable=0, location=no,menubar=no,status=no,top=200, left=700, width=425, height=450");
		};

		$scope.timer_running = false;
		$scope.max_count = 100;

		$scope.startProgress = function() {
			$scope.timer_running = true;
		 };

		$scope.stopProgress = function() {
		    $scope.timer_running = false;
		};

		//modal stuff
		$scope.animationsEnabled = true;
		$scope.open = function (size) {

		  	$scope.animationsEnabled = true;
		    //var modalInstance = 
		    $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      //controller: 'ModalInstanceCtrl',
		      size: size,
		      
		    });

	   };

		$scope.ok = function () {
			$scope.submitTest();
			$scope.stopProgress();
			
			sessionServiceV3.setComplete(testContainer.complete);
			
			//console.log("Completed: " + sessionServiceV3.getComplete());
		};
		
		$scope.cancel = function () {
			$scope.startProgress();
			$modal.close();
			$modal.dismiss('cancel');
			//$modal.('hide');
		};
		
		$scope.showNotes = false;
		
		$scope.showTextArea = function(){
			$scope.Notepad.message = testContainer.notes[$scope.currentPage];
			$scope.showNotes = true;
		};
		
		$scope.cancelNotes = function(){
			$scope.showNotes = false;
		};
		
		$scope.saveNotes = function(){
			testContainer.notes[$scope.currentPage] = $scope.Notepad.message;
			$scope.showNotes = false;
		
			sessionServiceV3.setUserNotepad(testContainer.notes);
		
		//console.log("My Notes: " + sessionServiceV3.getUserNotepad());
		};
	}
]);
