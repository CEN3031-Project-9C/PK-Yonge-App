'use strict';


angular.module('test_portal').directive('ngProgressbar', function($timeout) {
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
