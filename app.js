var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var users = require('./routes/users')
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// compress all responses // do not use here..
//app.use(compression())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use('/', index);
app.use('/api', api);//sim api
app.use('/users', users);//users api
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
app.use("/results",express.static(path.join(__dirname, 'results')))
app.use("/data",express.static(path.join(__dirname, 'data')))
//,{
//   extensions:['gz','json.gz'],
//   setHeaders: function(res,path){
//       res.set({'Content-Encoding':'gzip'})
//     }
// }))
//app.use('/results',results)
//serve gzipped simulation results


app.use("/", express.static(path.join(__dirname,'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.render('error',{error: err});
});

module.exports = app;
