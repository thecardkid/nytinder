var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var ObjectId = require('mongoose').Types.ObjectId;

/* 
GET particular user. First it looks for the id in the User
collection, then finds (in the Article collection) all the 
articles whose ids are present in the user.articles array
*/
router.get('/:id', function(req, res, next) {
  User.findOne({
  	'_id': new ObjectId(req.params.id)
  }, function(err, user) {
  	if (!err) {
			res.send(user);
  	} else {
  		console.log('error', err);
  		res.send(err);
  	}
  })
});

router.put('/', function(req, res, next) {
  console.log(req.body);
  User.update({
    '_id': new ObjectId(req.body.userId)
  }, {$inc: {
    'onArticle': req.body.seen
  }}, function(err, model) {
    err ? res.json(String(err.code)) : res.json('Updated');
  });
});

/*
POST a new user.
*/
router.post('/', function(req, res, next) {
	(new User(req.body)).save(function(err, user) {
		if (!err) {
			res.send(user)
		} else {
			console.log(err);
			res.send(err);
		}
	})
});

module.exports = router;