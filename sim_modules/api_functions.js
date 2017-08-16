var fs = require('graceful-fs');
var path = require('path');
var request = require("request")
var conf = require("./config");
var appDir = conf.appRoot; //path.dirname(require.main.filename);
var dataRoot = conf.dataRoot;
require('datejs');
var config = require(path.join(appDir,'sim_modules','config'))
var write = require(path.join(appDir, "sim_modules", 'logs'));
var users = require(path.join(appDir, "sim_modules", 'users'));

var testData = require(path.join(appDir, 'test', 'testdata.json'))
var testUsers = require(path.join(appDir, 'test', 'testusers.json'))

var simulation = require(path.join(appDir, 'sim_modules','simulation'))

var rndInt = function (min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

var userTestData = exports.userTestData = function (u) {//moves test users from test folder to results folder and adds to config file
  write.makeSimFiles("test")
  testUsers.forEach(function (el) {
    //for each user write out to userfile in results test folder..
    //write.makeSimFiles("test")
    var now = Date.today()
    el.arrivaldatetime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), rndInt(07, 11), rndInt(0, 59), rndInt(0, 59))
    el.departuredatetime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), rndInt(13, 19), rndInt(0, 59), rndInt(0, 59))
    users.addUser(el, "test")
  }, this);
  return u;
}

var processUserData = exports.processUserData = function (obj) {
  //move arrival time + departure into users 
  //model already exists..

  for (i = 0; i < obj.PCusers.length; i++) {
    obj.PCusers[i].addedToSim = false
    obj.PCusers[i].simArrival = write.getSimTimefromISOtime(obj.PCusers[i].arrivaldatetime)
    obj.PCusers[i].simDuration = write.getSimTimefromISOtime(obj.PCusers[i].departuredatetime) - obj.PCusers[i].simArrival
    obj.PCusers[i].model = users.getModelfromId(obj.PCusers[i].vehicleId)
    obj.PCusers[i].user = {
      "type": "PC",
      "duration": write.getSimTimefromISOtime(obj.PCusers[i].departuredatetime) - obj.PCusers[i].simArrival,
      "cap_pref": obj.PCusers[i].netformcharge,// 0.8,
      "cap_min": 0.2
    }
  }
  return obj
}

var buildConfig = exports.buildConfig = function (simid) {
  //check if is test (blank body)
    //use appropriate config file.
  ////for test use testdata
  ////for live use 
  var simconfig = config.simData

  simconfig.SimID=simid
	write.makeSimFiles(simid);
	var UData = JSON.parse(fs.readFileSync(write.folders.userFile));
	//process UDATA
  simconfig.PCusers = UData;
  console.log(simconfig)
	//console.log(JSON.stringify(config))
	simconfig = apifunction.processUserData(simconfig);//
	return simconfig ;//res.send(simulation.simulate(req.body,req.query.sId));
}



var runSimulation = exports.runSimulation = function(configfile){
  console.log("yyyy",configfile)
  return simulation.simulate(configfile)
}