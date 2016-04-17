var mongoose = require('mongoose');

var Article = mongoose.Schema({
	data: {type: [mongoose.Schema.Types.Mixed], required: true}
}, {collection: 'Articles'});

//probably don't need to specify the collection twice
module.exports = mongoose.model('Articles', Article);
