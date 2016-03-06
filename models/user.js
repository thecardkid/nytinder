var mongoose = require('mongoose');

var User = mongoose.Schema({
	userId: {type: String, required: true, unique: true},
	displayName: {type: String, required: true},
	articles: {type: [String], default: []}
}, {collection: 'Users'});

module.exports = mongoose.model('Users', User);