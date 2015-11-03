'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var QuestionSchema = new Schema({
  question_body: String,
  question_type: String,
  question_subject: String,
  answer_choices: [String],
  correct_answer: [String],
  standard: String
});

mongoose.model('Question', QuestionSchema);
