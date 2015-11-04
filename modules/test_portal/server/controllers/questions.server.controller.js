'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Question = mongoose.model('Question'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a question
 */
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

/**
 * Show the current question
 */
exports.read = function (req, res) {
  res.json(req.question);
};

/**
 * Update a question
 */
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

/**
 * Delete an question
 */
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

/**
 * List of Questions
 */
exports.list = function (req, res) {
  Question.find().exec(function (err, questions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(questions);
    }
  });
};

/**
 * Question middleware
 */
exports.questionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Question is invalid'
    });
  }

  Question.findById(id).populate('user', 'displayName').exec(function (err, question) { //Populate finds objectId and replaces it with actual info.
    if (err) {
      return next(err);
    } else if (!question) {
      return res.status(404).send({
        message: 'No question with that identifier has been found'
      });
    }
    req.question = question;
    next();
  });
};
