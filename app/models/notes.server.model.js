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
	good:  {
		type: Boolean
	},
	text: {
    	type: String,
    },
	created: {
		type: Date,
		default: Date.now
	},
	child: {
		type: Schema.ObjectId,
		ref: 'Child'
	}
});

mongoose.model('Notes', NotesSchema);