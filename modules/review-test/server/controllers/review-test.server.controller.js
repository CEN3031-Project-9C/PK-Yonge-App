'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User_session = mongoose.model('User_Session'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// Create a question
/*
exports.create = function (req, res) {
  var question = new Question(req.body);
  question.user = req.user;

  question.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};
*/

// Show the current session
exports.read = function (req, res) {
  res.json(req.User_session);
};

// Update a question
/*
exports.update = function (req, res) {
  var question = req.question;

  question.title = req.body.title;
  question.content = req.body.content;

  question.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};
*/

// Delete a question
/*
exports.delete = function (req, res) {
  var question = req.question;

  question.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};
*/

// List of Sessions
exports.list = function (req, res) {
  User_session.find().exec(function (err, sessions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(sessions);
    }
  });
};

// Find a session by its User ID
exports.allUser_sessionsWithUserID = function (req, res) {
  console.log("all user sessions with user id");
	User_session.find({user_id: req.params.userID}).exec(function (err, user_sessions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user_sessions);
		}
	});
	
};

// Session middleware
exports.user_sessionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Session is invalid'
    });
  }

  User_session.findById(id).populate('user', 'displayName').exec(function (err, user_session) { //Populate finds objectId and replaces it with actual info.
    if (err) {
      return next(err);
    } else if (!user_session) {
      return res.status(404).send({
        message: 'No session with that identifier has been found'
      });
    }
    req.user_session = user_session;
    next();
  });
};
