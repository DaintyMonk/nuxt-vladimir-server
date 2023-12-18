const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	confirmed: {
		type: Boolean,
		default: false
	}

}, {
	timestamps: true
});

module.exports = Mongoose.model('User', UserSchema);