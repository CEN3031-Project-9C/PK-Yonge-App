'use strict';

// Module dependencies
var mongoose = require('mongoose');

// Question Schema
//Consider changing test_id to be ObjectId instead of string
var QuestionSchema = new mongoose.Schema({
	test_id: String,
	question_body: String,
	question_type: String,
	question_subject: String,
	answer_choices: [String],
	correct_answer: [String],
	standard: String
});

// Make the Question model after this Schema
mongoose.model('Question', QuestionSchema);
