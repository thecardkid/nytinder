var mongoose = require('mongoose');

var Article = mongoose.Schema({
	articleId: {type: String, required: true, unique: true},
	info: {type: mongoose.Schema.Types.Mixed, required: true}
}, {collection: 'Articles'});

module.exports = mongoose.model('Articles', Article);