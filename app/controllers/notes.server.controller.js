'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Notes = mongoose.model('Notes'),
    Child = mongoose.model('Child'),
    _ = require('lodash');

/**
 * Create a Note
 */
exports.create = function(req, res) {
    if (req.child.user.id !== req.user.id) {
        res.status(403).send({ message: 'The user logged in does not have access to this child!' });
    } else {
        var user = req.user;
        var elfin = user.isElfSignedin(req.session.elfsignintime);
        if(elfin.loggedin) {
            var note = new Notes(req.body);
            Child.findById(note.child).populate('user', 'displayName').populate('list notes').exec(function (err, child) {
                note.save();
                child.notes.push(note);
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
        } else {
            res.status(401).send({ 'message': elfin.message});
        }
    }
};

/**
 * Show the current Note
 */
exports.read = function(req, res) {
    res.jsonp(req.note);
};

/**
 * Update a Note
 */
exports.update = function(req, res) {
    console.log(req.body);
    if (req.child.user.id !== req.user.id) {
        res.status(403).send({ message: 'The user logged in does not have access to this child!' });
    } else {
        var user = req.user;
        var elfin = user.isElfSignedin(req.session.elfsignintime);
        if(elfin.loggedin) {
            var note = req.note ;

            note = _.extend(note , req.body);

            note.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(note);
                }
            });
        } else {
            res.status(401).send({ 'message': elfin.message});
        }
    }
};

/**
 * Delete an Note
 */
exports.delete = function(req, res) {
    if (req.child.user.id !== req.user.id) {
        res.status(403).send({ message: 'The user logged in does not have access to this child!' });
    } else {
        var user = req.user;
        var elfin = user.isElfSignedin(req.session.elfsignintime);
        if(elfin.loggedin) {
            var note = req.note;

            note.remove(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    Child.findById(note.child).populate('user', 'displayName').populate('list notes').exec(function (err, child) {
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
        } else {
            res.status(401).send({ 'message': elfin.message});
        }
    }
};

/**
 * List of Notes
 */
exports.list = function(req, res) {
    res.jsonp(req.child.notes);
};

/**
 * Notes middleware
 */
exports.noteByID = function(req, res, next, id) {
    Notes.findById(id).populate('user', 'displayName').exec(function (err, note) {
        if (err) return next(err);
        if (!note) return next(new Error('Failed to load Note ' + id));
        req.note = note;
        next();
    });
};
