'use strict';

// questionsService, a service used for communicating with the questions REST endpoints
angular.module('review-test').factory('user_sessionsByUserIDService', [
	'$resource',
	function ($resource) {
		return $resource('api/user_sessionsByUserID/:userID', null,
			{
				allUser_sessionsWithUserID: {
					method: 'GET',
					isArray: true,
				}
			});

	}
]);