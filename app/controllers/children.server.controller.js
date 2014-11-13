'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Child = mongoose.model('Child'),
	_ = require('lodash');

/**
 * Create a Child
 */
exports.create = function(req, res) {
	var child = new Child(req.body);
	child.user = req.user;

	child.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(child);
		}
	});
};

/**
 * Show the current Child
 */
exports.read = function(req, res) {
  if (req.child.user.id !== req.user.id) {
    res.status(403).send({ message: 'The user logged in does not have access to this child!' });
  } else {
    res.jsonp(req.child);
  }
};

/**
 * Update a Child
 */
exports.update = function(req, res) {
  if (req.child.user.id !== req.user.id) {
    res.status(403).send({ message: 'The user logged in does not have access to this child!' });
  } else {
    var user = req.user;
    var elfin = user.isElfSignedin(req.session.elfsignintime);
    if(elfin.loggedin) {
      var child = req.child ;

      child = _.extend(child , req.body);

      child.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(child);
        }
      });
    } else {
      res.status(401).send({ 'message': elfin.message});
    }
  }
};

/**
 * Delete an Child
 */
exports.delete = function(req, res) {
  if (req.child.user.id !== req.user.id) {
    res.status(403).send({ message: 'The user logged in does not have access to this child!' });
  } else {
    var user = req.user;
    var elfin = user.isElfSignedin(req.session.elfsignintime);
    if(elfin.loggedin) {
      var child = req.child;

      child.remove(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.jsonp(child);
        }
      });
    } else {
      res.status(401).send({ 'message': elfin.message});
    }
  }
};

/**
 * List of Children
 */
exports.list = function(req, res) { Child.find({ user: req.user }).sort('-created').populate('user', 'displayName').populate('list notes').exec(function(err, children) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
      console.log('boo');
			res.jsonp(children);
		}
	});
};

/**
 * Child middleware
 */
exports.childByID = function(req, res, next, id) { Child.findById(id).populate('user', 'displayName').populate('list notes').exec(function(err, child) {
		if (err) return next(err);
		if (! child) return next(new Error('Failed to load Child ' + id));
    //child.populate();
		req.child = child ;
		next();
	});
};

/**
 * Child authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.child.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
