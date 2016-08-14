var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
// Modules for storing sessions
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Routers
var routes = require('./server/routes/index');
var users = require('./server/routes/users');

// Database Config
var config = require('./server/config/databaseUrl.js');
 // Connect the database
mongoose.connect(config.url);
 // Check if MongoDB is running
mongoose.connection.on('error', function(err) {
  console.error("MongoDB Connection Error: ", err);
});

var app = express();

// passport Configuration
require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
// secret for session
app.use(session({
  secret: 'keepitsecret',
  saveUninitialized: true,
  resave: true,
  // Store sessions on MongoDB using express-session + connect-mongo
 /* store: new MongoStore({
    url: config.url,
    collection: 'sessions'
  })*/
}));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());


app.use('/', routes);
app.use('/users', users);

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
