var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var conf = require("./sim_modules/config");
var appRoot = conf.appRoot;
var dataRoot = conf.dataRoot;

var api = require(path.join(appRoot,'routes','api'));
var users = require(path.join(appRoot,'routes','user')); 
var testusers = require(path.join(appRoot,'routes','testuser')); 
var helpers = require(path.join(appRoot,'routes','helpers'));

var app    = express(),
    http 	 = require('http').Server(app),
    io 		 = require('socket.io')(http);
console.log(io);
    //handle app communications - like routes but commands instead of urls
    io.on('connection', function(socket){
      // socket.on('login', function(updObj){
      // 	createUser(updObj, function(car){
      // 		io.to(socket.id).emit('userSetup', car);
      // 	});
      // });
    });
    
app.use(favicon(path.join(appRoot, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);//sim api
app.use('/user', users);//users api
app.use('/testuser', testusers);
app.use('/helper',helpers);

//deal with sending results back
app.get("/results/*", function (req, res, next) {
  //leave main settings file uncompressed because chrome and jquery $getJSON apears to have timing issues with gzip
  //pretty damn hacky if you ask me
  if (req.url.split("/")[3] != "settings.json") {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', "gzip");
    res.set("Content-Type", "application/json")
  }
  next()
})


//set static paths
app.use("/results",express.static(path.join(dataRoot, 'results')));
app.use("/data",express.static(path.join(appRoot, 'data')));
app.use("/sim",express.static(path.join(appRoot, 'public','sim')));
app.use("/app",express.static(path.join(appRoot, 'public','app')));
app.use("/docs",express.static(path.join(appRoot, 'public','docs')));
app.use("/", express.static(path.join(appRoot,'public','app')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json({ error: err })//  res.render('error',{error: err});
});

module.exports = app;
