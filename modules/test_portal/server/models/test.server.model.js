'use strict';

// Module dependencies.
var mongoose = require('mongoose');

// Test Schema
var TestSchema = new mongoose.Schema({
 	 test_subject: String,
 	 test_name: String,
 	 questions_id: [String]
});

// Make the Test model after this Schema
mongoose.model('Test', TestSchema);
