'use strict';

// userSessions service used for communicating with the userSessions REST endpoints
angular.module('choose-test').factory('User_Sessions', ['$resource',
  function ($resource) {
    return $resource('api/user_session/:user_sessionId', { //connection to back end route
      sessionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


