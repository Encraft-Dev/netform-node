var express = require('express');
var path = require('path');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var Ajv = require('ajv');
var jsonfile = require('jsonfile')
var fs = require('graceful-fs')
require('datejs')
var write = require (path.join(appDir,"sim_modules",'logs.js'))

///TODO ---- move to own file/////////////////////////////////
var addUser = function(obj){
  var simid = Date.today().toString("yyyy_MM_dd")
  var userFolder = path.join(appDir,"results",simid)
  var userFile = path.join(userFolder,"users.json")
  if (!fs.existsSync(userFolder)){fs.mkdirSync(userFolder)} // make folder 
  if (!fs.existsSync(userFile)){fs.writeFileSync(userFile,"[]",function(err){if (err) throw err;})} // make usersfile 
  // check if user already exists  
  var users =  JSON.parse(fs.readFileSync(userFile))
  userExists=users.findIndex(function (el) {return el.uid == obj.uid;})
  userExists==-1?createUser(userFolder,users,obj):updateUser(userFolder,users,obj,userExists)
  return "user added/updated"
}

var createUser = function(userFolder,users,obj){
    users.push(obj)
    write.timelog(userFolder,"users",users,false)
    return true
}

var updateUser = function(userFolder,users,obj,updateIndex){
  console.log("update")
  users[updateIndex]=obj
  write.timelog(userFolder,"users",users,false)
  return true
}
//////////////////////////////////////////////////////////



/* GET users listing. */
router.get('/',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = require(path.join(appDir,"results",simid,"users.json"))
  res.send(data);
});
//return template format
router.get('/add', function(req, res, next) {
  var data = require(path.join(appDir,"data","Users","template.json"))
  res.send(data);
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
  valid?addUser(data):false
  res.send(output);
  
});


router.get('/:id',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = require(path.join(appDir,"results",simid,"users.json"))
  var userid = req.params.id
  console.log(userid)
  // check for user existing
  output = userid?data.filter(function (el) {return el.uid == userid;}):data
  res.send(output);
});

module.exports = router;
