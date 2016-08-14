(function() {
	'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// define the Schema for our user model
var userSchema = new Schema({
	local: {
		email: String,
		password: String
	}
});

// Generating the hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validating the password
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// Create the model and export it to app
module.exports = mongoose.model('User', userSchema);

})();
