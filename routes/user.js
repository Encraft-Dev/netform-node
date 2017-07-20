var express = require('express');
var path = require('path');
var router = express.Router();
var zlib = require('zlib')
var Ajv = require('ajv');

var fs = require('graceful-fs')
require('datejs')
var conf = require("../sim_modules/config");
var appDir = conf.appRoot;
var write = require (path.join(appDir,"sim_modules",'logs.js'))
var users = require (path.join(appDir,"sim_modules",'users.js'))

/* GET users listing. */
router.get('/',function(req,res,next){
  //list all users in current day

  var simid = Date.today().toString("yyyy_MM_dd")
  write.makeSimFiles(simid)

  var data = JSON.parse(fs.readFileSync(path.join(write.folders.sim,"users.json")));// require(path.join(appDir,"results",simid,"users.json"))
  res.send(data);
});
//return template format
router.get('/add', function(req, res, next) {
  var data = require(path.join(appDir,"data","Users","template.json"))
  res.send(data);
});

router.post('/add',function(req,res,next){
  var schema = require(path.join(appDir,"data","Users","template.json"))
  var data = req.body;
  var ajv = new Ajv({allErrors: true});
  var validate = ajv.compile(schema);
  var valid = validate(data);

  output  = valid ? {'Accepted':'check back in a while to once the sim has run again'} : ajv.errorsText(validate.errors)
  valid?users.addUser(data):false
  res.send(output);

});

router.post('/update', function(req, res, next) {
  var schema = require(path.join(appDir,"data","Users","template.json"))
  var data = req.body
  //check if input is valid against schema
  var ajv = new Ajv({allErrors: true});
  var validate = ajv.compile(schema);
  var valid = validate(data);

  output  = valid ? "Accepted:check back in a while to once the sim has run again" : ajv.errorsText(validate.errors)
  //add to user list
  valid?users.addUser(data):false
  res.send(output);

});

router.get('/:id/:time',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(write.folders.veh,req.params.time+".json.gz"))));
  var userid = req.params.id
  console.log(data,userid)
  // check for user existing
  output = data.filter(function (el) {return el.nfAppId == userid;})
  res.send(output);
});

router.get('/:id',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = JSON.parse(fs.readFileSync(path.join(write.folder.sim,"users.json")));
  var userid = req.params.id
  console.log(userid)
  // check for user existing
  output = userid?data.filter(function (el) {return el.uid == userid;}):data
  res.send(output);
});

module.exports = router;
