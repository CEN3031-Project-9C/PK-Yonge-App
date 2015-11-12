'use strict';

// questionsService, a service used for communicating with the questions REST endpoints
angular.module('test_portal').factory('questionsService', [
	'$resource',
	function ($resource) {
		return $resource('api/questions/:questionId', {questionId: '@_id'},
			{
				update: {
					method: 'PUT'
				}
			});

	}
]);
