'use strict';

/**
	THIS SERVICE IS PROBABLY UNNECESSARY SINCE userSessions.client.service.js DOES THE SAME THING AND IS INCLUDED IN THE CONTROLLER (choose-test.client.controller.js) BUT IT MAY BE INCLUDED IN ANOTHER MODULE'S CONTROLLER - WE DID NOT HAVE TIME TO TEST THIS
**/

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
