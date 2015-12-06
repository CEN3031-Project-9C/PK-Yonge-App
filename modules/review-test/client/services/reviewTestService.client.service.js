'use strict';

angular.module('review-test').factory('reviewTestService', function() {
  
  var user_sessionContainer = {
    user_sessions: []
  };
  
  user_sessionContainer.setUser_sessions = function(arrayOfUser_sessions) {
    if(arrayOfUser_sessions !== null) {
      user_sessionContainer.user_sessions = arrayOfUser_sessions;
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
  
  user_sessionContainer.retrieveUser_sessions = function() {
    return user_sessionContainer.user_sessions;
  };
  
  return (user_sessionContainer);
  
});