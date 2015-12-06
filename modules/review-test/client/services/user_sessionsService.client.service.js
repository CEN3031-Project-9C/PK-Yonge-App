'use strict';

// questionsService, a service used for communicating with the questions REST endpoints
angular.module('review-test').factory('user_sessionsService', [
  '$resource',
  function ($resource) {
    return $resource('api/user_sessions/:user_sessionId', {user_sessionId: '@_id'},
      {
        update: {
          method: 'PUT'
        }
      });

  }
]);
