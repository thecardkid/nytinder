var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var ObjectId = require('mongoose').Types.ObjectId;
var keys = require('../keys');
var request = require('request');

// Convert verbose API response from NYTimes to more succinct object to take up less space
function processJSON(response) {
	var newAll = [];
	response.map(function(elem, i) {
        // might be more efficent to do this as an else in your if(elem.media)
		var selectImg = {
			url: "http://www.trbimg.com/img-56b0e859/turbine/la-na-inside-iowa-caucus-precinct-20160202",
			width: 2048,
			height: 1162
		};

		if (elem.media) {
			selectImg = (elem.media[0]['media-metadata']).reduce(function(prev, curr, i, arr) {
				return prev.width > curr.width ? prev : curr;
			}, {width: 0});
		}

		var newObject = {
			url: elem.url,
			byline: elem.byline,
			abstract: elem.abstract || '',
			headline: elem.title,
			date: elem.published_date,
			articleId: elem.id,
			img: selectImg,
		};
		newAll.push(newObject);
	});
	return newAll;
}

/*
POST a new article. Creates a new Article model object
using relevant information received from the NYTimes API.
Then it finds the user, and pushes the new article's id onto
user.article.
*/
router.post('/', function(req, res, next) {
    // I don't think you need an exec unless you are chaining queries or using promises
	Article.find().exec(function(findErr, articleModel) {
        // I don't think you need to convert the id to an Object Id (it does the coercion for you
		User.findOne({'_id': new ObjectId(req.body.userId)}).exec(function(userFindErr, userModel) {
            // might want to clean up debugging logs
			console.log(userModel);
			if (findErr || userFindErr) {
				res.send(findErr || userFindErr);
				return;
			}

			var differentDay = true;
			if (articleModel.length > 0) {
				var lastPolled = articleModel[0]['_id'].getTimestamp();
				var today = new Date();
				console.log(lastPolled.toJSON().slice(0,10), today.toJSON().slice(0,10));
				var differentDay = lastPolled.toJSON().slice(0,10) !== today.toJSON().slice(0,10);
			}

			if (!differentDay && userModel.onArticle >= 19) {

				res.send('Sorry, wait til tomorrow');

			} else if (differentDay || !articleModel) {

				Article.remove({}, function(removeErr) {
					if (removeErr) {
						res.send(removeErr);
						return;
					}
				});

				userModel.onArticle = 0;
				userModel.save();

				var url = "http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=" + keys.most_popular;
				request(url, function(apiErr, result, body) {
					if (!apiErr) {
						var data = processJSON(JSON.parse(body).results);
						console.log(data);
						(new Article({data: data})).save(function(saveErr, model) {
							if (saveErr) {
								res.json(saveErr);
								return;
							}
							res.json({'data': data});
						});
					} else {
						res.json(apiErr);
					}
				});

			} else {
				console.log('proceed like normal', articleModel[0]['data'].length);
				res.json({'data': articleModel[0].data.slice(userModel.onArticle+1)});
			}
		});
	});
});

module.exports = router;

