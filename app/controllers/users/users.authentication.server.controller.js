'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.username;

	// Then save the user 
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
      user.elfPassword = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}
	});
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
      user.elfPassword = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

exports.elfsignin = function(req, res) {
  User.find({_id: req.user._id}, function(err, user2) {
    if(user2[0].elfauthenticate(req.body.elfPassword)) {
      var elfsignintime = new Date().getTime()/1000;
      req.session.elfsignintime = elfsignintime;
      res.jsonp( { elfsignintime: req.session.elfsignintime  });
    }
    else {
      delete req.session.elfsignintime;
      res.status(400).json({ message: 'You are not logged in to family account, or you have entered an invalid elf password!' });
    }
  });
};

/**
 * signs the elf out
 */
exports.elfsignout = function(req, res) {
  delete req.session.elfsignintime;
  res.jsonp({success: true});
};
/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
