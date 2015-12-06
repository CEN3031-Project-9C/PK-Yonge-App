'use strict';

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

  //USER_ID
  sessionContainer.setUserID = function(theID) {
    sessionContainer.user_id = theID;
  };
  
  sessionContainer.getUserID = function(theID) {
    return sessionContainer.user_id;
  };

  //TEST_ID
  sessionContainer.setTestID = function(theID) {
    sessionContainer.test_id = theID;
  };
  
  sessionContainer.getTestID = function() {
    return sessionContainer.test_id;
  };

  //TIMER
  sessionContainer.setTime = function(theID) {
    sessionContainer.timer = theID;
  };
  
  sessionContainer.getTime = function() {
    return sessionContainer.timer;
  };

  //COMPLETED
  sessionContainer.setComplete = function(theID) {
    sessionContainer.completed = theID;
  };
  
  sessionContainer.getComplete = function() {
    return sessionContainer.completed;
  };

  //NOTEPAD
  sessionContainer.setUserNotepad = function(newarray) {
    sessionContainer.user_notepad = newarray;
  };

  sessionContainer.getUserNotepad = function() {
    return sessionContainer.user_notepad;
  };

  //USER_ANSWER
  sessionContainer.setUserAnswer = function(newarray) {
    sessionContainer.user_answer = newarray;
  };

  sessionContainer.getUserAnswer = function() {
    return sessionContainer.user_answer;
  };

  //REVIEW
  sessionContainer.setReview = function(newarray) {
    sessionContainer.review = newarray;
  };
  
  sessionContainer.getReview = function() {
    return sessionContainer.review;
  };

  //CORRECT
  sessionContainer.setCorrect = function(newarray) {
    sessionContainer.correct = newarray;
  };
  
  sessionContainer.getCorrect = function() {
    return sessionContainer.correct;
  };


  
  return (sessionContainer);
  
});