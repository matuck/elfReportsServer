'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your email'],
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: '',
		//validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
  elfPassword: {
    type: String,
    default: '',
    //validate: [validateLocalStrategyPassword, 'Password should be longer']
  },
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
  	resetPasswordExpires: {
  		type: Date
  	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	if (this.password && this.password.length > 6) {
		this.password = this.hashPassword(this.password);
	}
  if (this.elfPassword && this.elfPassword.length > 6) {
    this.elfPassword = this.hashPassword(this.elfPassword);
  }
	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

/**
 * Create instance method to authenticate the elf
 */
UserSchema.methods.elfauthenticate = function(password) {
  return this.elfPassword === this.hashPassword(password);
};

/**
 * check if elf is authenticated
 */
UserSchema.methods.isElfSignedin = function($signedintime) {
  if($signedintime === undefined) {
    return {
      'loggedin': false,
      'message': 'Not Signed in'
    };
  } else{
    var expiretime = 10 * 60; //minutes time seconds
    var currtime = new Date().getTime()/1000;
    if (currtime <= (parseInt($signedintime) + expiretime)) {
      return {
        'loggedin': true
      };
    } else {
      return {
        'loggedin': false,
        'message': 'Elf has timed out'
      };
    }
  }
};
/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);