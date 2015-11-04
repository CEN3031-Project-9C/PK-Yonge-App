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
	}
});

mongoose.model('User_session', User_sessionSchema);
