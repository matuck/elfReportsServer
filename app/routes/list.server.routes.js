'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var children = require('../../app/controllers/children');
	var list = require('../../app/controllers/list');

	// Children Routes
	app.route('/children/:childId/list')
			.get(list.list)
			.post(users.requiresLogin, list.create);

	app.route('/children/:childId/list/:itemId')
			.delete(users.requiresLogin, children.hasAuthorization, list.delete);

	// Finish by binding the Child middleware
	app.param('childId', children.childByID);
	app.param('itemId', list.itemByID);
};
