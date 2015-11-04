'use strict';

angular.module('choose-test').factory('passSessionID', function(theID){
  var sessionContainer = {};
  
  var setSessionID = function(theID) {
	  sessionContainer.ID = theID;
  };
  
  var getSessionID = function() {
	  return sessionContainer.ID;
  };
  
  return {
	  setSessionID : setSessionID,
	  getSessionID : getSessionID
  };
  
});