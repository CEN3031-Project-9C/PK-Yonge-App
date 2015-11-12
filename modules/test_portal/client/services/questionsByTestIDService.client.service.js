'use strict';

// questionsService, a service used for communicating with the questions REST endpoints
angular.module('test_portal').factory('questionsByTestIDService', [
	'$resource',
	function ($resource) {
		return $resource('api/questionsByTestID/:testID', null,
			{
				allQuestionsWithTestID: {
					method: 'GET',
					isArray: true,
				}
			});

	}
]);
