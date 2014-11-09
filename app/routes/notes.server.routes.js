'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var children = require('../../app/controllers/children');
	var notes = require('../../app/controllers/notes');

	// Children Routes
	app.route('/children/:childId/notes')
			.get(notes.list)
			.post(users.requiresLogin, notes.create);

	app.route('/children/:childId/notes/:noteId')
			.get(notes.read)
			.put(users.requiresLogin, children.hasAuthorization, notes.update)
			.delete(users.requiresLogin, children.hasAuthorization, notes.delete);

	// Finish by binding the Child middleware
	app.param('childId', children.childByID);
	app.param('noteId', notes.noteByID);
};
