'use strict';

/**
 * Module dependencies.
 */
 
var path = require('path'),
  	mongoose = require('mongoose'),
  	User_sessions = mongoose.model('User_session'),
  	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a user_session
 */
exports.create = function (req, res) {
  var user_session = new User_sessions(req.body);
  //session.user = req.user;

  user_session.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user_session);
    }
  });
};

/**
 * Show the current user_session
 */
exports.read = function (req, res) {
  res.json(req.user_session);
};

/**
 * Update a user_session
 */
exports.update = function (req, res) {
  	var user_session = req.user_session;

  	//user_session.tests_id = req.body.tests_id;
	user_session.time = req.body.time;
	user_session.complete = req.body.complete;
	user_session.user_notepad = req.body.user_notepad;
	user_session.user_answer = req.body.user_answer;
	user_session.review = req.body.review;

	user_session.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user_session);
		}
	});
};

/**
 * Delete a user_session
 */
/*
exports.delete = function (req, res) {
  var user_session = req.user_session;

  user_session.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user_session);
    }
  });
};
*/

/**
 * List of user_Sessions
 */
exports.list = function (req, res) {
  User_sessions.find().exec(function (err, user_sessions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(user_sessions);
    }
  });
};


// Middleware to handle requests containing a user_sessionId parameter
exports.user_sessionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Session is invalid'
    });
  }

  User_sessions.findById(id).exec(function (err, user_session) { //Populate finds objectId and replaces it with actual info.
    if (err) {
      return next(err);
    } else if (!user_session) {
      return res.status(404).send({
        message: 'No user_session with that ID has been found'
      });
    }
    req.user_session = user_session;
    next();
  });
  
  
};
