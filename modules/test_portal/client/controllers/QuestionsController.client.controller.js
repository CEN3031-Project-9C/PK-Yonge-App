//Pulls information from the db and stores it locally on the front end for quicker manipulation and interaction with view.
//Calls back to update database when appropriate.

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
	//Pass these parameters in the same order into the below function
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionServiceV3, questionsService, questionsByTestIDService, takeTestService, gradeTestService) {
	  	
	  	//Allows access to the current signed-in instance
		$scope.authentication = Authentication;
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

	//Setting up variables to represent the test portal in the front end				
		$scope.currentPage = 0; //Page numbering starts at 0-- view displays "currentPage+1" so that users see pages starting at page # 1
		
		//to hold answers filled in by users from the different question forms
		$scope.formData = {
			answer: []
		};

		$scope.Notepad = {
			message: String
		};

		//for marking for review
		$scope.marked = "btn-default"; //view's button appearance is set to this variable, which subs in the appropriate color.
		$scope.reviewButtonText = "Mark for Review";
		//for notepad
		$scope.showNotes = false;
		
		$scope.numberOfPages = function() {
			return $scope.testQuestions.questions.length;
		};
		
		//not accessible by the view, but holds this information for access & manipulation
		var testContainer = {
			questions: [],	// we will store retrieved questions in this array
			answers: [],	// we will store the user's answers in this array
			review: [],		// we will store whether or not questions are marked for review in this array
			notes: []		// we will store the notes for the selected question in this array
		};
		
		//accessible by the view to display questions
		$scope.testQuestions = {
			questions: []
		};

		//to access test container in view.
		$scope.getTestContainer = function(){
			return testContainer;
		};

	//Dealing with question load/display
		//Populates questions[] array with questions from the appropriate test. Also sets proper parts of Service objects so that other modules can access information.
		$scope.loadQuestions = function() {
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionServiceV3.getTestID()}, //use sessionServiceV3 to get id of stored test and set this to be passed to questionsByTestIDService
				function() {

					takeTestService.setQuestions(testContainer.questions);		// Save the questions locally
					gradeTestService.setQuestions(testContainer.questions);
					$scope.testQuestions.questions = testContainer.questions;	// Make the questions available to the front-end
					
				}
			);
			
		};

		$scope.getType = function(index) //Returns the question type of a specific numbered question
		{
			return testContainer.questions[index].question_type;
		};

		$scope.getCorrect = function(index) //Returns the question's correct answer
		{
			return testContainer.questions[index].correct_answer;
		};

	//Methods for question navigation
		//called anytime user tries to change questions to save answer & make sure it's ok to move on
		$scope.saveAnswer = function() {
			testContainer.answers[$scope.currentPage] = $scope.formData.answer; //reads answers from form and stores at proper index of user's answer section of container object
			sessionServiceV3.setUserAnswers(testContainer.answers); //Updates sessionServiceV3 object that is accessible to other modules

			//Checks to move on past unanswered question
			//multiple choice & fill-in-the-blank (appear as undefined):
			if (testContainer.answers[$scope.currentPage] === undefined) //if the answer is empty (i.e. there was no data in the MC form when testContainer.answers[i] was set), check if they want to proceed
			{
				var proceed = confirm("You haven't saved an answer to this question! Are you sure you want to proceed?"); //confirm generates a box with "ok" (returns true) and "cancel" (returns false) options 
				if (proceed === true) 
				{
					return true; //They want to continue
				} 
				else 
				{
					return false; //They want to cancel & go back
				}
			}
			//checkbox (appear as empty array):
			else if ($scope.getType($scope.currentPage) === "check")//at one point we also had || $scope.getType($scope.currentPage) === "fill") ...if the fill-in-the-blanks aren't acting right, try adding this back in
			{
				if (testContainer.answers[$scope.currentPage].length === 0)//If the array of answers is empty, confirmation box
				{
					var proceedMultiple = confirm("You haven't saved an answer to this question! Are you sure you want to proceed?");
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
		
		//If user has already worked with a question, display their previous progress anytime user navigates back to the question
		$scope.reloadSaved = function()
		{
			//repopulate form with what's at the corresponding index of container of user-answers
			$scope.formData.answer = testContainer.answers[$scope.currentPage];

			//set review button's status appropriately
			if (testContainer.review[$scope.currentPage])
			{
				$scope.marked = "btn-danger";
				$scope.reviewButtonText = "Unmark";
			} else {
				$scope.marked = "btn-default";
				$scope.reviewButtonText = "Mark for Review";				
			}

			$scope.showNotes = false; //reset notepad on new question
			//set notepad contents appropriately
			$scope.Notepad.message = testContainer.notes[$scope.currentPage];
		};

		//navigate to previous question
		$scope.previousQuestion = function() {
			if ($scope.saveAnswer()) //save answer. will return "true" if user is clear to move on or "false" if they elected to stay on current page.
			{
				$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)	
				$scope.reloadSaved(); //reload saved stuff for that new page
			}
		};
		
		//navigate to previous question
		$scope.nextQuestion = function() {
			if ($scope.saveAnswer()) //save answer. will return "true" if user is clear to move on or "false" if they elected to stay on current page.
			{
				$scope.currentPage = $scope.currentPage + 1;	// Update pagination (show requested question)
				$scope.reloadSaved();	//reload saved stuff for that new page
			}		
		};

		//navigate non-sequentially via dropdown menu
		$scope.jumpTo = function(num){
			if ($scope.saveAnswer()) //save answer. will return "true" if user is clear to move on or "false" if they elected to stay on current page.
			{
				$scope.currentPage = num; // Update pagination (show requested question)
				$scope.reloadSaved(); //reload saved stuff for that new page
			}
		};
		
		//Marking for review
		//called when view's Review button is clicked
		$scope.mark_unmark = function() {
			if (!testContainer.review[$scope.currentPage]) //If that position in review array is false (is yet unmarked)
			{
				testContainer.review[$scope.currentPage] = true; //change it to true
				$scope.marked = "btn-danger"; //change color to red
				$scope.reviewButtonText = "Unmark"; //change text
			}
			else //If review array has true (already marked)
			{
				testContainer.review[$scope.currentPage] = false; //change it to false
				$scope.marked = "btn-default"; //change color back to default
				$scope.reviewButtonText = "Mark for Review"; //change text
			}

			sessionServiceV3.setReview(testContainer.review); //update sessionServiceV3 object with this updated state
		};

		//used by view to see if a flag should appear next to questions that have been marked. 
		//PROBABLY CAN BE COMBINED WITH PREVIOUS METHOD
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
		//Check whether entire test has any unanswered questions. called from Submit method that begins when view's Submit button clicked
		$scope.checkUnanswered = function() {
			var unanswered = ""; //String to represent all of the numbers matching unanswered questions, so they can be reported to the user.
			for (var i = 0; i < $scope.testQuestions.questions.length; i++)
			{
				//if nothing has been added to the user's answer array at that position, question is unanswered
				//multiple choice & fill appear as "undefined," checkbox questions appear as empty array
				if (testContainer.answers[i] === undefined || ($scope.getType(i) === "check" && testContainer.answers[i].length === 0)) 
				{
					unanswered += (i+1);
					unanswered += ", ";  //might want to make the comma happen conditionally as long as it's not the last unanswered question
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

		//function to submit test. called on Submit button click
		$scope.submitTest = function() {
			
			
			$scope.saveAnswer(); //If the user has selected an answer for that question, we want it to be stored.
			
			var proceed = $scope.checkUnanswered(); //Check whether they have unanswered questions.
			////Returns true if they had no unanswered questions, or if they DID have unanswered questions but chose to continue

			if (proceed === true) 
			{
				// Save all final answers
				gradeTestService.setUserAnswers(sessionServiceV3.getUserAnswers());

				//SWITCH TO Review-TEST MODULE
				$location.path('/examHistory');
			}
			else
			{
				//don't submit answers or change page. Return to test
				//this might be the place to restart a timer
			}
			
			
		};

		//function to check user's answers against correct answers
		$scope.gradeTest = function() {
			var total = $scope.testQuestions.questions.length;
			var correct = 0; //initially, say they got 0 correct.
            
            //grade each appropriately depending on answer type
			for (var i = 0; i < $scope.testQuestions.questions.length; i++)
			{
                if ($scope.getType(i) === "multiple_choice")
                {
				    if (testContainer.answers[i] === $scope.getCorrect(i)[0]) //technically a 1D correct answer
				    {
				    	correct++;
				    }
			    }
			    else //checkbox and fill-in-the-blank have an array of answers
			    {
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
		};

	//Extra tools
		//calculator
		$scope.openCalcWindow = function(){
			var myWindow = window.open("calculator", "calcWindow", "resizable=0, location=no,menubar=no,status=no,top=200, left=700, width=425, height=450");
		};

		//timer
		$scope.timer_running = true;
		$scope.max_count = 1000;

		//For use in future implementing of pausing functionality
		/*$scope.startProgress = function() {
			$scope.timer_running = true;
		 };*/

		$scope.stopProgress = function(){
		    $scope.timer_running = false;
		};


		//modal stuff
		$scope.animationsEnabled = true;
		$scope.open = function (size) 
		{
		  	$scope.animationsEnabled = true;
		    $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'myModalContent.html',
		      size: size,
		    });
		};

		//Modal selection options:
		$scope.ok = function () 
		{
			$scope.submitTest();
			$scope.stopProgress();

			sessionServiceV3.setComplete(testContainer.complete);
		};

		$scope.cancel = function () 
		{
			$scope.startProgress();
			$modal.close();
			$modal.dismiss('cancel');
			//$modal.('hide');
		};

     	$scope.openFormula = function (size) 
     	{
	    	$scope.animationsEnabled = true;
		    $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'formulaModal.html',
		      size: size,
		    });
		};

	   //notepad
		$scope.showTextArea = function()
		{
			$scope.Notepad.message = testContainer.notes[$scope.currentPage];

			$scope.showNotes = true;
		};

		$scope.cancelNotes = function()
		{
			$scope.showNotes = false;
		};

		$scope.saveNotes = function()
		{
			testContainer.notes[$scope.currentPage] = $scope.Notepad.message;
			$scope.showNotes = false;

			sessionServiceV3.setUserNotepad(testContainer.notes);
		};


		 
		/*
		NOTE: AN ATTEMPT TO MOVE THE NOTEPAD DIV BY CHANGING DIV POSITION THROUGH EVENT TRIGGERS WITH JAVASCRIPT.
		STACKOVERFLOW: http://stackoverflow.com/questions/9334084/moveable-draggable-div
		JFIDDLE: http://jsfiddle.net/wfbY8/4/
		
		*/
/*
	   	$scope.divwidth = 400;
  		$scope.divheight = 300;
  		$scope.show = true;
  		$scope.divtop = 80;
  		$scope.divleft = 50;
  		$scope.divtop2 = 180;
  		$scope.divleft2 = 150;

		$scope.addListeners = function (){
		   var ele=  angular.element( document.querySelector( '#dxy' ) );
		   ele.addEventListener('onmousedown', mouseDown, false);
		   $window.addEventListener('mouseup', mouseUp);
		

		};

		function mouseUp()
		{
		    $window.removeEventListener('mousemove', divMove, true);
		}
		
		function mouseDown(e){
		  	$window.addEventListener('mousemove', divMove, true);
		}
		
		function divMove(e){
		    var div = angular.element('#dxy');
			  div.css("position", 'absolute');
			  div.css("top", e.clientY + 'px');
			  div.css("left", e.clientX + 'px');
		}
*/

	}
]);
