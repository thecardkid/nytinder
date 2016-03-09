var mongoose = require('mongoose');

var Article = mongoose.Schema({
	data: {type: [mongoose.Schema.Types.Mixed], required: true}
}, {collection: 'Articles'});

module.exports = mongoose.model('Articles', Article);