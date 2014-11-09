'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	name: {
    	type: String
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

mongoose.model('Item', ItemSchema);
