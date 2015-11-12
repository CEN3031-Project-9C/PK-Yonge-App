'use strict';

angular.module('choose-test').factory('sessionService', function() {
	
  var sessionContainer = {
	  sID: 0,
	  tID: ""
  };
  
  sessionContainer.setSessionID = function(theID) {
	  sessionContainer.sID = theID;
  };
  
  sessionContainer.getSessionID = function() {
	  return sessionContainer.sID;
  };
  
  sessionContainer.setTestID = function(theID) {
	  sessionContainer.tID = theID;
  };
  
  sessionContainer.getTestID = function() {
	  return sessionContainer.tID;
  };
  
  return (sessionContainer);
  
});