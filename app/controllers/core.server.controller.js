'use strict';

/**
 * Module dependencies.
 */
var nodemailer = require('nodemailer'),
		config = require('../../config/config'),
		async = require('async');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

/**
 * Send an email message
 */
exports.sendmessage = function(req, res, next) {
	/*console.log(req.body);
	async.waterfall([
		// If valid email, send reset email using service
		function(done) {
			var smtpTransport = nodemailer.createTransport(config.mailer.options);
			var mailOptions = {
				to: 'support@elfreports.com',
				from: 'support@elfreports.com',
				subject: 'Message from Website',
				html: req.body.message
			};
			console.log(config.mailer.options);
			smtpTransport.sendMail(mailOptions, function(err) {
				if (!err) {
					res.send({
						message: 'Your message has been sent.'
					});
				}

				done(err);
			});
		}
	], function(err) {
		if (err) return next(err);
	});*/
};
