var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var User = mongoose.Schema({
	userId: {type: String, required: true, unique: true},
	displayName: {type: String, required: true},
	savedArticles: {type: [mongoose.Schema.Types.Mixed], default: []},
	onArticle: {type: Number, required: true, default: 0},
}, {collection: 'Users'});

User.plugin(findOrCreate);

module.exports = mongoose.model('Users', User);