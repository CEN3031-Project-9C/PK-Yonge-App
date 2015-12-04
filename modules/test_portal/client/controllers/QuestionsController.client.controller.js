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
	'sessionServiceV2',
	'questionsService', 
	'questionsByTestIDService',
	'takeTestService',
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionServiceV2, questionsService, questionsByTestIDService, takeTestService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}
				
		$scope.currentPage = 0;
		
		$scope.formData = {
			answer: undefined
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
		
		$scope.check = function(index) {
			if (testContainer.review[index])
			{
				return true;
			}
			else
			{
				return false;
			}
		};

		$scope.loadQuestions = function() {
						
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionServiceV2.getTestID()},
				function() {

					takeTestService.setQuestions(testContainer.questions);		// Save the questions locally
					$scope.testQuestions.questions = testContainer.questions;	// Make the questions available to the front-end
					
				}
			);
			
		};

		//Next 2 methods are code in the body of BOTH previousQuestion and nextQuestion, extracted to be their own methods
		//(if you ever were to edit the code, reduces chance of updating code in one place but not where it's duplicated elsewhere)
		$scope.saveAnswer = function() {
			testContainer.answers[$scope.currentPage] = $scope.formData.answer;
			sessionServiceV2.setUserAnswer(testContainer.answers);	
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
			else //If the answer's not empty, proceed.
			{
				return true;
			}	


			/*
			// For testing purposes
			console.log("testContainer...");
			console.log(testContainer);
			console.log("testContainer.answers...");
			console.log(testContainer.answers);
			console.log("$scope.formData.answer...");
			console.log($scope.formData.answer);
			*/

			//console.log("My answers: " + sessionServiceV2.getUserAnswer());

			// To-do, save this answer to the DB on question switch
		};
		$scope.reloadSaved = function()
		{
			$scope.formData.answer = testContainer.answers[$scope.currentPage];

			//^Previously this statement was in the below "if," but I don't think it needs to be. value will just be "undefined" if nothing has been entered.
			/*
			 if(testContainer.answers[$scope.currentPage] !== 0) { //************I think it goes in here every time. (if they haven't saved an answer, I believe it's undefined rather than 0)
			 	$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			 } 
			 else{ //never enters
			 	$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			 }*/

			if (testContainer.review[$scope.currentPage])
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

			sessionServiceV2.setReview(testContainer.review);

			//console.log("My Review: " + sessionServiceV2.getReview());
		};


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
				console.log("submitted test");

				//SWITCH TO POST-TEST MODULE
			}
			else
			{
				console.log("cancel & go back to test");
				//continue with test
			}
		};
		$scope.openCalcWindow = function(){
			var myWindow = window.open("calculator", "calcWindow", "resizable=0, location=no,menubar=no,status=no,top=200, left=700, width=425, height=450");
		};

		$scope.timer_running = false;
		$scope.max_count = 100;

		$scope.startProgress = function() {
			$scope.timer_running = true;
		 };

		$scope.stopProgress = function(){
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
	    
	    sessionServiceV2.setComplete(testContainer.complete);

	    //console.log("Completed: " + sessionServiceV2.getComplete());
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

			sessionServiceV2.setUserNotepad(testContainer.notes);

			//console.log("My Notes: " + sessionServiceV2.getUserNotepad());
		};


		 

		$scope.addListeners = function (){
			alert("Hello6");
		    //$document.getElementById('dxy').addEventListener('mousedown', mouseDown, false);
		    //var ele = angular.element('#dxy');
		   var ele=  angular.element( document.querySelector( '#dxy' ) );
		    alert("Hello");
		    ele.addEventListener('onmousedown', mouseDown, false);
		    alert("Hello4");
		    $window.addEventListener('mouseup', mouseUp);
		    alert("Hello5");

		};

		//$scope.mouseUp = function ()
		 function mouseUp()
		{
			alert("Hello1");
		    $window.removeEventListener('mousemove', divMove, true);
		}

		//$scope.mouseDown = function (e){
			 function mouseDown(e){
		alert("Hello2");
		  $window.addEventListener('mousemove', divMove, true);
		}

		//$scope.divMove = function (e){
			  function divMove(e){
			alert("Hello3");
		    //var div = $document.getElementById('dxy');
		    var div = angular.element('#dxy');
		  //div.style.position = 'absolute';
		  //div.style.top = e.clientY + 'px';
		  //div.style.left = e.clientX + 'px';
		  div.css("position", 'absolute');
		  div.css("top", e.clientY + 'px');
		  div.css("left", e.clientX + 'px');
			}


	}
]);
