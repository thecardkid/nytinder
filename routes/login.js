var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');
var ObjectId = require('mongoose').Types.ObjectId;

// logs you in and adds user if you never logged in before
router.get('/', function(req, res, next){
  console.log("logging in stuff")
  try {
    var username = req.session.passport.user.displayName;
    var id = req.session.passport.user.id;
    console.log(req.session.passport.user)
    User.findOne({displayName : username}, function (err, user) {
          if (!user) {

            // var newuser = new User();
            // newuser.displayName = username

            (new User({displayName: username, userId: id})).save(function(err, user) {
              if (!err) {
                console.log(user);
                res.json(user);
                return;
              } else {
                res.json(err)
                return;
              }
            })
            // newuser.save(function(err){
            //   console.log(newuser._id)
            //   res.json({displayName:username, _id: newuser._id});
            //   return;
            // });
          }else{
            console.log(user);
            res.json(user);
            // res.json({displayName:username, _id: user._id});
            return;
          }
    });
  }
  catch(err) {
    console.log("asjaisjaisjaisjiajs")
    console.log(err.toString())
  }
});

module.exports = router;