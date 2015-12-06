'use strict';

// Review Question controller
angular.module('review-test').controller('ReviewController', [
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
	'PreviousExam'
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, sessionService, questionsService, questionsByTestIDService, takeTestService, PreviousExam) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}


		$scope.find = function () {
      $scope.previous_test = PreviousExam.query();
    };

	}
]);
