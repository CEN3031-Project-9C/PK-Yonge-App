'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User_Session Schema
 */
var User_SessionSchema = new Schema({
	user_id: {
		type: Schema.ObjectId //user_id & test_id are references to other objects.
	},
	test_id: {
		type: Schema.ObjectId
	},
	time: {
		type: Number
	},
	complete: {
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

mongoose.model('User_Session', User_SessionSchema);
