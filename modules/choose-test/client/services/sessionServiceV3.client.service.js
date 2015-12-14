//A session is accessible throughout different modules, so setting and getting information to/from this object is how information is passed between them.
'use strict';

angular.module('choose-test').factory('sessionServiceV3', function() {
	
	var sessionContainer = {
		session: {}
	};
	
	// This function should only be used once, the first time the factory is used (i.e. only set the reference to the user_session object ONCE!)
	sessionContainer.setSessionObject = function(sessionObject) {
		sessionContainer.session = sessionObject;
	};
	
	// Retrive the entire session object - this should only be used during testing
	sessionContainer.getSessionObject = function() {
		return sessionContainer.session;
	};
	
	// Update the ID of this user session - this should only be used during testing
	sessionContainer.setSessionID = function(newSessionId) {
		sessionContainer.session._id = newSessionId;
	};
	
	// Retrieve the ID of this user session
	sessionContainer.getSessionID = function() {
		return sessionContainer.session._id;
	};
	
	// Update the user's ID for which the session is associated - this is not used on a regular
	sessionContainer.setUserID = function(userId) {
		sessionContainer.session.user_id = userId;
	};
	
	// Retrieve the user ID associated with this session
	sessionContainer.getUserID = function() {
		return sessionContainer.session.user_id;
	};
	
	// Update the user's Test ID - this is not used on a regular basis
	sessionContainer.setTestID = function(testId) {
		sessionContainer.session.test_id = testId;
	};
	
	// Retrieve the user's test ID
	sessionContainer.getTestID = function() {
		return sessionContainer.session.test_id;
	};
	
	// Update the time left in this session
	sessionContainer.setTime = function(duration) {
		sessionContainer.session.time = duration;
	};
	
	// Get the time remaining for this user's session
	sessionContainer.getTime = function() {
		return sessionContainer.session.time;
	};

	// Update the completion status of this user session (i.e. whether the test is finished or not)
	sessionContainer.setComplete = function(completionStatus) {
		sessionContainer.session.complete = completionStatus;
	};

	// Retrieve the completion status of this user session
	sessionContainer.getComplete = function() {
		return sessionContainer.session.complete;
	};

	// Update the review flags for the questions present in this user session
	sessionContainer.setReviewFlags = function(reviewFlags) {
		sessionContainer.session.review = reviewFlags;
	};

	// Retrieve this session's review flags (i.e. an array of booleans which questions, if any, the user wants to review)
	sessionContainer.getReviewFlags = function() {
		return sessionContainer.session.review;
	};

	// Update the user's answer choices
	sessionContainer.setUserAnswers = function(answerChoices) {
		sessionContainer.session.user_answer = answerChoices;
	};

	// Retrieve the user's answers
	sessionContainer.getUserAnswers = function() {
		return sessionContainer.session.user_answer;
	};
	
	// Update the user's notepad
	sessionContainer.setUserNotepad = function(notepadArray) {
		sessionContainer.session.user_notepad = notepadArray;
	};
	
	// Retrieve the user's notepad
	sessionContainer.getUserNotepad = function() {
		return sessionContainer.session.user_notepad;
	};
	
	// Update the "correct" flags (i.e. the array of booleans that indicate whether the user got each question correct)
	sessionContainer.setCorrectFlags = function(correctFlags) {
		sessionContainer.session.correct = correctFlags;
	};
	
	// Retrieve the "correct" flags
	sessionContainer.getCorrectFlags = function() {
		return sessionContainer.session.correct;
	};
	
	// Make the properties and functions of this service available
	return (sessionContainer);
  
});