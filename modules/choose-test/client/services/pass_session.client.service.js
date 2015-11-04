'use strict';

angular.module('choose-test').factory('passSessionID', function(theID){
  var sessionContainer = {};

  sessionContainer.ID = theID;

  return sessionContainer;
});