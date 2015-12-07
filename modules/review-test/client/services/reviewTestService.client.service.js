'use strict';

angular.module('review-test').factory('reviewTestService', function() {
  
  var sessionContainer = {
    sessions: []
  };
  
  sessionContainer.setUser_sessions = function(arrayOfUser_sessions) {

    if(arrayOfUser_sessions !== null) {
      sessionContainer.sessions = arrayOfUser_sessions;
    } else {
      console.log("The provided array was invalid");
      return;
    }
  };
  
  // questionContainer.updateQuestions = function(index, singleQuestion) {
  //   if(index <= questionContainer.questions.length) {
  //     questionContainer.questions[index] = singleQuestion;
  //   } else {
  //     console.log("index ("+ index + ") was out of bounds!");
  //     return;
  //   }
  // };
  
  sessionContainer.retrieveUser_sessions = function() {
    return sessionContainer.user_sessions;
  };
  
  return (sessionContainer);
  
});