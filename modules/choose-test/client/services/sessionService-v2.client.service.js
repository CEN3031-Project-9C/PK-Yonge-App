'use strict';

angular.module('choose-test').factory('sessionService-v2', function() {
	
  var sessionContainer = {
	  _id: 0,
	  test_id: "",
    time: 0,
    complete: false,
    review: [],
    user_answer: [],
    user_notepad: [],
    __v: 0
  };
  
  //SESSION ID
  sessionContainer.setSessionID = function(theID) {
	  sessionContainer._id = theID;
  };
  
  sessionContainer.getSessionID = function() {
	  return sessionContainer._id;
  };

  //TEST_ID
  sessionContainer.setTestID = function(theID) {
	  sessionContainer.test_id = theID;
  };
  
  sessionContainer.getTestID = function() {
	  return sessionContainer.test_id;
  };

  //TIME
  sessionContainer.setTime = function(theID) {
    sessionContainer.tID = theID;
  };
  
  sessionContainer.getTime = function() {
    return sessionContainer.tID;
  };

  //COMPLETE
  sessionContainer.setComplete = function(theID) {
    sessionContainer.tID = theID;
  };
  
  sessionContainer.getComplete = function() {
    return sessionContainer.tID;
  };

  //REVIEW
  sessionContainer.setReview = function(newarray[]) {
    sessionContainer.review = newarray;
  };
  
  sessionContainer.getReview = function() {
    return sessionContainer.review;
  };

   //USER_ANSWER
  sessionContainer.setUserAnswer = function(newarray[]) {
    sessionContainer.user_answer = newarray;
  };
  
  sessionContainer.getUserAnswer = function() {
    return sessionContainer.user_answer;
  };

   //REVIEW
  sessionContainer.setUserNotepad = function(newarray[]) {
    sessionContainer.user_notepad = newarray;
  };
  
  sessionContainer.getUserNotepad = function() {
    return sessionContainer.user_notepad;
  };
  
  return (sessionContainer);
  
});