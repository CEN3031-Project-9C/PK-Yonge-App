'use strict';

// userSessions service used for communicating with the userSessions REST endpoints
angular.module('test_portal').factory('User_SessionsTP', ['$resource',
  function ($resource) {
    return $resource('api/user_session/:user_sessionId', { //connection to back end route
      user_sessionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


