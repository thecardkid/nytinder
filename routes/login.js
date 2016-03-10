var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var ObjectId = require('mongoose').Types.ObjectId;

// logs you in through facebook and adds user if you never logged in before
router.get('/', function(req, res, next) {
  if (req.session.passport) {
    var username = req.session.passport.user.displayName;
    var id = req.session.passport.user.id;
    User.findOrCreate({
      displayName: username,
      userId: id
    }, function(err, user, isNew) {
      isNew ? console.log('new') : console.log('old');

      if (err) {
        res.send(err);
        console.log(err);
        return;
      }

      res.json(user);
    });
  }
});

module.exports = router;