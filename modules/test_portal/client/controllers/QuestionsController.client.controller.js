'use strict';

// Questions controller
angular.module('test_portal').controller('QuestionsController', [
	'$scope', 
	'$window', 
	'$document',
	'$stateParams', 
	'$location',
	'$modal',
	'$log', 
	'Authentication', 
	'sessionServiceV3',
	'questionsService', 
	'questionsByTestIDService',
	'takeTestService',
	'gradeTestService',
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionServiceV3, questionsService, questionsByTestIDService, takeTestService, gradeTestService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

		//Setting up variables				
		$scope.currentPage = 0;
		
		$scope.formData = {
			answer: []
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
			questions: [],
		};

		$scope.getTestContainer = function(){
			return testContainer;
		};

		//Dealing with question load/display
		$scope.loadQuestions = function() {
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionServiceV3.getTestID()},
				function() {

					takeTestService.setQuestions(testContainer.questions);		// Save the questions locally
					gradeTestService.setQuestions(testContainer.questions);
					$scope.testQuestions.questions = testContainer.questions;	// Make the questions available to the front-end
					
				}
			);
			
		};

		$scope.getType = function(index) //Returns the question type
		{
			return testContainer.questions[index].question_type;
		};

		$scope.getCorrect = function(index) //Returns the question type
		{
			return testContainer.questions[index].correct_answer;
		};

		//Methods for navigation
		//Next 2 methods are code in the body of BOTH previousQuestion and nextQuestion, extracted to be their own methods
		//(if you ever were to edit the code, reduces chance of updating code in one place but not where it's duplicated elsewhere)
		$scope.saveAnswer = function() {
			testContainer.answers[$scope.currentPage] = $scope.formData.answer;
			sessionServiceV3.setUserAnswers(testContainer.answers);

		    var testingStuff = [];

			if (testContainer.answers[$scope.currentPage] === undefined) //if the answer is empty, check if they want to proceed
			{
				var proceed = confirm("You haven't saved an answer to this question! Are you sure you want to proceed?");
				if (proceed === true) 
				{
					return true; //They want to continue
				} 
				else 
				{
					return false; //They want to cancel & go back
				}
			}
			else if ($scope.getType($scope.currentPage) === "check" || $scope.getType($scope.currentPage) === "fill")
			{
				if (testContainer.answers[$scope.currentPage].length === 0)//If the array of answers is empty, ask
				{
					var proceedMultiple = confirm("You haven't put any answers for this question! Are you sure you want to proceed?");
					if (proceedMultiple === true) 
					{
						return true; //They want to continue
					} 
					else 
					{
						return false; //They want to cancel & go back
					}
			    }
			    else//If the array of answers isn't empty, proceed.
			    {
			    	return true;
			    }
			}
			else //If the answer's not empty, proceed.
			{
				return true;
			}	
		};
		
		$scope.reloadSaved = function()
		{
			$scope.formData.answer = testContainer.answers[$scope.currentPage];

			if (testContainer.review[$scope.currentPage])
			{
				$scope.marked = "btn-danger";
				$scope.reviewButtonText = "Unmark";
			} else {
				$scope.marked = "btn-default";
				$scope.reviewButtonText = "Mark for Review";				
			}

			$scope.Notepad.message = testContainer.notes[$scope.currentPage];
		};

		$scope.previousQuestion = function() {
			if ($scope.saveAnswer())
			{
				$scope.showNotes = false;
				$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)	
				$scope.reloadSaved();
			}
		};
		
		$scope.nextQuestion = function() {
			if ($scope.saveAnswer())
			{
				$scope.showNotes = false;
				$scope.currentPage = $scope.currentPage + 1;	// Update pagination (show requested question)
				$scope.reloadSaved();	
			}		
		};

		$scope.jumpTo = function(num){
			$scope.showNotes = false;
			$scope.saveAnswer();
			$scope.currentPage = num;
			$scope.reloadSaved();
		};
		
		//Marking for review
		$scope.mark_unmark = function() {
			if (!testContainer.review[$scope.currentPage])
			{
				testContainer.review[$scope.currentPage] = true;
				$scope.marked = "btn-danger";
				$scope.reviewButtonText = "Unmark";
			}
			else
			{
				testContainer.review[$scope.currentPage] = false;
				$scope.marked = "btn-default";
				$scope.reviewButtonText = "Mark for Review";
			}

			sessionServiceV3.setReview(testContainer.review);
		};

		$scope.checkForReview = function(index) {
			if (testContainer.review[index])
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		//Submission-related methods
		$scope.checkUnanswered = function() {
			var unanswered = ""; //String to represent all of the unanswered questions so they can be reported to the user.
			for (var i = 0; i < $scope.testQuestions.questions.length; i++)
			{

				if (testContainer.answers[i] === undefined)
				{
					unanswered += (i+1);
					if (i !== $scope.testQuestions.questions.length-1)
					{
						unanswered += ", ";
					}
				}
			}
			if (unanswered !== "") //If the string is not empty, then they DO have unanswered questions.
			{ //Display confirmation box letting them know which questions they haven't answered and making them choose whether or not to proceed
				var proceed = confirm("You have yet to select an answer for the following questions: \n" + unanswered + ". \n Are you sure you want to submit?");
				if (proceed === true) 
				{
					return true; //They want to submit anyways.
				} 
				else 
				{
					return false; //They want to cancel & go back to their test.
				}
			}
			else
			{
				return true; //If the string WAS empty, then they don't need the confirmation box. proceed regardless
			}
		};
		$scope.submitTest = function() {
			
			
			$scope.saveAnswer(); //If the user has selected an answer for that question, we want it to be stored.
			
			var proceed = $scope.checkUnanswered(); //Check whether they have unanswered questions.
			////Returns true if they had no unanswered questions, or if they DID have unanswered questions but chose to continue

			if (proceed === true) 
			{
				// do test-ending things(save back to DB?)

				// Save all final answers
				gradeTestService.setUserAnswers(sessionServiceV3.getUserAnswers());

				//SWITCH TO Review-TEST MODULE
				$location.path('/examHistory');
			}
			else
			{
				//continue with test
			}
			
			
		};

		$scope.gradeTest = function() {
			var total = $scope.testQuestions.questions.length;
			var correct = 0;
            
			for (var i = 0; i < $scope.testQuestions.questions.length; i++){
                if ($scope.getType(i) === "multiple_choice"){
				    if (testContainer.answers[i] === $scope.getCorrect(i)[0]){
				    	correct++;
				    }
			    }
			    else{
			    	var totalOptions = 0;
			    	for (var j = 0; j < $scope.getCorrect(i).length; j++){
				        if ($scope.getCorrect(i)[j] === "false"){
				    	    totalOptions++;
				        }
				        else if (String(testContainer.answers[i][j]) === String($scope.getCorrect(i)[j])){
                            totalOptions++;
				        }

				        if (totalOptions === $scope.getCorrect(i).length){

				        }
				    }
			    }
			}
			console.log(correct);
			console.log(total);
		};

		//Extra tools (calculator, timer, etc)
		$scope.openCalcWindow = function(){
			var myWindow = window.open("calculator", "calcWindow", "resizable=0, location=no,menubar=no,status=no,top=200, left=700, width=425, height=450");
		};

		$scope.timer_running = true;
		$scope.max_count = 1000;

		/*$scope.startProgress = function() {
			$scope.timer_running = true;
		 };*/

		$scope.stopProgress = function(){
		    $scope.timer_running = false;
		};

		//modal stuff
		$scope.animationsEnabled = true;
		$scope.open = function (size) {

		  	$scope.animationsEnabled = true;
		    $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      size: size,
		      
		    });

	   };

	   //Modal selection options:
	  $scope.ok = function () {
	  	$scope.submitTest();
	  	$scope.stopProgress();
	    
	    sessionServiceV3.setComplete(testContainer.complete);
	  };

	  $scope.cancel = function () {
	  	$scope.startProgress();
	    $modal.close();
	    $modal.dismiss('cancel');
	    //$modal.('hide');
	  };

      $scope.openFormula = function (size) {

	    $scope.animationsEnabled = true;

		    $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'formulaModal.html',
		      size: size,
		    });

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
		};


		 
		//Work in progress: making the notepad moveable
		$scope.addListeners = function (){
			alert("Hello6");
		   var ele=  angular.element( document.querySelector( '#dxy' ) );
		    alert("Hello");
		    ele.addEventListener('onmousedown', mouseDown, false);
		    alert("Hello4");
		    $window.addEventListener('mouseup', mouseUp);
		    alert("Hello5");

		};

		function mouseUp()
		{
			alert("Hello1");
		    $window.removeEventListener('mousemove', divMove, true);
		}
		
		function mouseDown(e){
			alert("Hello2");
		  	$window.addEventListener('mousemove', divMove, true);
		}
		
		function divMove(e){
			alert("Hello3");
		    var div = angular.element('#dxy');
			  div.css("position", 'absolute');
			  div.css("top", e.clientY + 'px');
			  div.css("left", e.clientX + 'px');
		}


	}
]);
