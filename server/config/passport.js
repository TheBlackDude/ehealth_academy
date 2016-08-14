(function() {
	'use strict';

	// import local strategy
	var LocalStrategy = require('passport-local').Strategy;
	// import the User model
	var User = require('../models/users');
    // export the passport module
    module.exports = function(passport) {
    	// Serialize User
    	passport.serializeUser(function(user, done) {
    		done(null, user.id);
    	});
    	// Deserialize User
    	passport.deserializeUser(function(id, done) {
    		User.findById(id, function(err, user) {
    			done(err, user);
    		});
    	});

    	// Configure local Strategy login
    	passport.use('local-login', new LocalStrategy({
    		// change default username and password to email and password
    		usernameField: 'email',
    		passwordField: 'password',
    		passReqToCallBack: true
    	},
    	function(req, email, password, done) {
    		// Async
    		process.nextTick(function() {
    			User.findOne({'local.email': email}, function(err, user) {
    				// if there is an error don't login return
    				if(err) {
    					return done(err);
    				}
    				// if email don't match don't login
    				if(!user) {
    					return done(null, false);
    				}
    				// if password does'nt match don't login
    				if(!user.validPassword(password)) {
    					return done(null, false);
    				}
    				else {
    					// if everything ok get user and login
    					return done(null, user);
    				}
    			});
    		});
    	}));

    	// Configure local Strategy Signup
    	passport.use('local-signup', new LocalStrategy({
    		// change default username and password to email and password
    		usernameField: 'email',
    		passwordField: 'password',
    		passReqToCallBack: true
    	},
    	function(req, email, password, done) {
    		// Async
    		process.nextTick(function() {
    			// check to see if user is not loggedIn
    			if (!req.user) {
    				User.findOne({'local.email': email}, function(err, user) {
    					// check for errors
    					if(err) {
    						return done(err);
    					}
    					// if email is not already taken
    					if(user) {
    						return done(null, false);
    					}
    					else {
    						// everything good Create User
    						var newUser = new User();
    						newUser.local.email = email;
    						newUser.local.password = newUser.generateHash(password);
    						newUser.save(function(err) {
    							if(err) {
    								throw err;
    							}
    							return done(null, newUser);
    						});

    					}
    				});
    			}
    			else {
    				// everything ok, register user
    				return done(null, req.user);
    			}
    		});
    	}));

    }

})();