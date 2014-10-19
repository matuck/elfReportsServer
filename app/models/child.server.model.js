'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Child Schema
 */
var ChildSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Child name',
		trim: true
	},
  percent: {
    type: Number,
    default: 50
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'notes' }],
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Child', ChildSchema);