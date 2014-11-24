'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	TokenStrategy = require('passport-token-auth').Strategy,
	jwt = require('jwt-simple'),
	jwtconf = require('../jwtconfig'),
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new TokenStrategy(
			function(token, done) {
				token = jwt.decode(token, jwtconf.secret);
				User.findOne({ username: token.username }, function (err, user) {
					if (err) { return done(err); }
					if (!user) { return done(null, false); }
					return done(null, user, { scope: 'all' });
				});
			}
	));
};
