//Currently this service is used for displaying all user sessions associated with a user on the review-test.client.view.html. not currently in use bc we couldn't finish its functionality.
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