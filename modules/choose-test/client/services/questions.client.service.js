'use strict';

// User_sessions service used for communicating with the sessions REST endpoints
angular.module('choose-test').factory('User_sessions', ['$resource',
  function ($resource) {
    return $resource('api/user_session/:user_sessionId', { //connection to back-end route
      sessionId: '@_id'
    }, {
      update: {	// Create an 'update' method
        method: 'PUT'
      }
    });
  }
]);
