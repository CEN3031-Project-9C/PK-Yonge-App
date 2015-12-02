'use strict';


angular.module('test_portal')
	.directive('ngProgressbar', function($timeout) {
		return {

			restrict : 'E',
			template : "<div class='progress'><div class='progress-bar progress-bar-{{type}}' role='progressbar' style='width:{{percent_complete}}%;'> {{percent_complete}} % </div></div>",
			replace : true,
			scope: {
            	max: '@',
            	start: '@',
            	type: '@',
            	onStop: '&'
        	},

        	controller : ['$scope', '$timeout', function($scope, $timeout) {
        		$scope.onTimeout = function() {
					$scope.startAt++;
					$scope.current = $scope.startAt;
					$scope.mytimeout = $timeout($scope.onTimeout,1000);
					if($scope.startAt >= $scope.max) {
						$scope.stop();
						$scope.onStop();
					}
					if($scope.startAt > 0 && $scope.startAt < $scope.max){
						$scope.resume();
					}
					$scope.percent_complete = Number(100 * $scope.current / $scope.max);
				};
				$scope.resume = function() {
					$scope.startAt = $scope.current;
					console.log($scope.current);
				};
				$scope.stop = function() {
					$timeout.cancel($scope.mytimeout);
					console.log($scope.current);
				};
        	}],

			link : function (scope, elem, attrs, ctrl) {

				attrs.$observe('start', function(value) {
					console.log('observe start change');
					if(value === 'true') {
						scope.startAt = 0;
						//scope.startAt = scope.current;
						scope.mytimeout = $timeout(scope.onTimeout,1000);
					}else if(value ==='false') {
						//scope.resume();
						scope.stop();
					}	
				});
			}
		};
	});
/*
angular.module('test_portal').controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.animationsEnabled = true;
  $scope.timer_running = false;
  $scope.max_count = 100;

 	$scope.startProgress = function() {
		$scope.timer_running = true;
	};

	$scope.stopProgress = function(){
		$scope.timer_running = false;
		    //pop up modal to pause the test...
	};

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});

<<<<<<< HEAD
*/
/*
angular.module('test_portal').controller('ModalInstanceCtrl', function ($scope,$modal, $log) {
  
  $scope.open = function (size) {

  	$scope.animationsEnabled = true;
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      //controller: 'ModalInstanceCtrl',
      size: size,
      
    });

   };

  $scope.ok = function () {
  	$scope.stopProgress();
    $modal.close();
  };

  $scope.cancel = function () {
  	$scope.startProgress();
    $modal.dismiss('');
  };

});
*/

angular.module('test_portal')
	.directive('draggable', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.draggable({
				cursor: "move",
				stop: function (event, ui) {
					scope[attrs.xpos] = ui.position.left;
          scope[attrs.ypos] = ui.position.top;
          scope.$apply();
				}
			});
		}
	};
});


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
	'sessionService',
	'questionsService', 
	'questionsByTestIDService',
	'takeTestService',
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionService, questionsService, questionsByTestIDService, takeTestService) {
	  	
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
				{testID: sessionService.getTestID()},
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
			
			/*
			// For testing purposes
			console.log("testContainer...");
			console.log(testContainer);
			console.log("testContainer.answers...");
			console.log(testContainer.answers);
			console.log("$scope.formData.answer...");
			console.log($scope.formData.answer);
			*/

			// To-do, save this answer to the DB on question switch
		};
		$scope.reloadSaved = function()
		{
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
