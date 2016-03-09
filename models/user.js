var mongoose = require('mongoose');

var User = mongoose.Schema({
	userId: {type: String, required: true, unique: true},
	displayName: {type: String, required: true},
	savedArticles: {type: [mongoose.Schema.Types.Mixed], default: []},
	onArticle: {type: Number, required: true, default: 0},
}, {collection: 'Users'});

module.exports = mongoose.model('Users', User);