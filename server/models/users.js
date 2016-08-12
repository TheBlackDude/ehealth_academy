(function() {
	'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let Schema = mongoose.Schema;

// define the Schema for our user model
let userSchema = new Schema({
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
model.exports = mongoose.model('User', userSchema);

})();
