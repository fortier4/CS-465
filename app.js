//UPDATED 6/15/2022
require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
//UPDATED 6/15/2022
const passport = require("passport");

//UPDATED 6/5/2022
require('./app_api/database/db'); //trigger database connection
//given code below may have had typo so I added "/" as shown above
//require('.app_api/database/db');
//require('./app_api/models/db'); //given in guide

//UPDATED 6/15/2022
require("./app_api/config/passport");

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
//UPDATED 6/5/2022
const apiRouter = require('./app_api/routes/index');    //reference new router

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//UPDATED 6/15/2022
app.use(passport.initialize());

//UPDATED 6/15/2022
// Allow CORS
app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
//UPDATED 6/5/2022
app.use('/api', apiRouter);   //send requests for '/api' to the api router

//UPDATED 6/15/2022
//catch unauthorized error
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
