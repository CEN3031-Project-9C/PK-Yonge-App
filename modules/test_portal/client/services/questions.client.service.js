'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('test_portal').factory('Questions', ['$resource',
  function ($resource) {
    return $resource('api/questions/:questionId', { //connection to baack end route
      questionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
