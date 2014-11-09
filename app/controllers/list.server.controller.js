'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    List = mongoose.model('Item'),
    Child = mongoose.model('Child'),
    _ = require('lodash');

/**
 * Create a List
 */
exports.create = function(req, res) {
    if (req.child.user.id !== req.user.id) {
        res.status(403).send({ message: 'The user logged in does not have access to this child!' });
    } else {
        var item = new List(req.body);
        Child.findById(item.child).populate('user', 'displayName').populate('list notes').exec(function (err, child) {
            item.save();
            child.list.push(item);
            child.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(child);
                }
            });
        });
    }
};

/**
 * Delete a List item
 */
exports.delete = function(req, res) {
    if (req.child.user.id !== req.user.id) {
        res.status(403).send({ message: 'The user logged in does not have access to this child!' });
    } else {
        var item = req.item;

        item.remove(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                Child.findById(item.child).populate('user', 'displayName').populate('list notes').exec(function(err, child) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(child);
                    }
                });
            }
        });
    }
};

/**
 * List of Lists
 */
exports.list = function(req, res) {
    res.jsonp(req.child.list);
};

/**
 * List middleware
 */
exports.itemByID = function(req, res, next, id) { List.findById(id).populate('user', 'displayName').exec(function(err, item) {
    if (err) return next(err);
    if (! item) return next(new Error('Failed to load List Item ' + id));
    req.item = item ;
    next();
});
};
