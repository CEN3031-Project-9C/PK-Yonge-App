'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Session Schema
 */
var User_sessionSchema = new Schema({
	user_id: {
		type: Schema.ObjectId
	},
	test_id: {
		type: Schema.ObjectId
	},
	timer: {
		type: Number
	},
	completed: {
		type: Boolean
	},
	user_notepad: {
		type: [String]
	},
	user_answer: {
		type: [String]
	},
	review: {
		type: [Boolean]
	},
	correct: {
		type: [Boolean]
	}
});

mongoose.model('User_session', User_sessionSchema);
