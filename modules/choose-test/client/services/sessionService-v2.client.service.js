'use strict';
//initializes session container
angular.module('choose-test').factory('sessionServiceV2', function() {
	
  var sessionContainer = {
	  _id: 0,
	  test_id: "",
    timer: 0,
    completed: false,
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
    sessionContainer.timer = theID;
  };
  
  sessionContainer.getTime = function() {
    return sessionContainer.timer;
  };

  //COMPLETE
  sessionContainer.setComplete = function(theID) {
    sessionContainer.completed = theID;
  };
  
  sessionContainer.getComplete = function() {
    return sessionContainer.completed;
  };

  //REVIEW
  sessionContainer.setReview = function(newarray) {
    sessionContainer.review = newarray;
  };
  
  sessionContainer.getReview = function() {
    return sessionContainer.review;
  };

   //USER_ANSWER
  sessionContainer.setUserAnswer = function(newarray) {
    sessionContainer.user_answer = newarray;
  };
  
  sessionContainer.getUserAnswer = function() {
    return sessionContainer.user_answer;
  };

   //REVIEW
  sessionContainer.setUserNotepad = function(newarray) {
    sessionContainer.user_notepad = newarray;
  };
  
  sessionContainer.getUserNotepad = function() {
    return sessionContainer.user_notepad;
  };
  
  return (sessionContainer);
  
});