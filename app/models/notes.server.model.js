'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notes Schema
 */
var NotesSchema = new Schema({
	// Notes model fields   
	// ...
});

mongoose.model('Notes', NotesSchema);