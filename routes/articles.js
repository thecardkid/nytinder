var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var ObjectId = require('mongoose').Types.ObjectId;

/*
POST a new article. Creates a new Article model object
using relevant information received from the NYTimes API.
Then it finds the user, and pushes the new article's id onto
user.article.
*/
router.post('/', function(req, res, next) {
	var body = req.body.article;
	var img = '';
	if (body.multimedia) {
		img = body.multimedia[body.multimedia.length-1]
	}
	var articleId = body._id;

	(new Article({
		web_url: body.web_url,
		snippet: body.snippet,
		lead_paragraph: body.lead_paragraph,
		article_id: articleId,
		pub_date: body.pub_date,
		headline: body.headline.main,
		authors: body.byline.person,
		word_count: body.word_count,
		image_link: img
	})).save(function(err, article) {
		if (!err) {
			User.findOne({
				'_id': new ObjectId(req.body.userId)
			}, function(err, user) {
				if (!err) {
					user.articles.push(articleId);
					user.save(function(err, user) {
						if (!err) {
							res.send('Article added');
						} else {
							console.log(err)
							res.send(err);
						}
					});
				} else {
					console.log(err);
					res.send(err);
				}
			});
		} else {
			console.log(err);
			res.send(err);
		}
	})
});

module.exports = router;
