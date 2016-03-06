var mongoose = require('mongoose');

var Article = mongoose.Schema({
	web_url: {type: String, required: true},
	snippet: {type: String, required: true},
	lead_paragraph: {type: String, required: true},
	article_id: {type: String, required: true, unique: true},
	image_link: {type: mongoose.Schema.Types.Mixed},
	pub_date: {type: String, required: true},
	headline: {type: String, required: true},
	word_count: {type: Number, required: true},
	authors: {type: [mongoose.Schema.Types.Mixed], required: true}
}, {collection: 'Articles'});

module.exports = mongoose.model('Articles', Article);