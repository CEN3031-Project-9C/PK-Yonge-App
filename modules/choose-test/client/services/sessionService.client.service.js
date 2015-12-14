'use strict';

/**
	THIS SERVICE MAY NO LONGER BE NECESSARY AS THERE IS NOW A "V3" VERSION. PLEASE COMMENT THIS FILE OUT AND TEST TO SEE IF THIS IS TRUE - REMOVE IT FROM THE MODULE IF SO. WE DID NOT HAVE TIME TO TEST THIS OUT.
**/

//original session service, modfied in v2
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