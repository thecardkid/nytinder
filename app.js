var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var login = require('./routes/login');
var users = require('./routes/users');
var articles = require('./routes/articles');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');

var app = express();

var password = require("./password")(passport);

// Connect to database
mongoose.connect('mongodb://localhost/tindertimes');
// mongoose.connect('mongodb://yunhsincynthiachen:nytinderolinjs7@ds019668.mlab.com:19668/nytinder')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'this is not a secret ;)',
  cookie:{},
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//GET Requests for Facebook LogIn
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' })
);


// Logout of Facebook
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

app.use('/api/login', login);
app.use('/api/user', users);
app.use('/api/article', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
