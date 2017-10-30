require('datejs');
var fs = require('graceful-fs');
var path = require('path');
var request = require("request")
var conf = require("./config");
var appDir = conf.appRoot; //path.dirname(require.main.filename);
var dataRoot = conf.dataRoot;

//load local modules
var config = require(path.join(appDir, 'sim_modules', 'config'));
var write = require(path.join(appDir, "sim_modules", 'logs'));
var users = require(path.join(appDir, "sim_modules", 'users'));
var simulation = require(path.join(appDir, 'sim_modules', 'simulation'))
//load test data
var testData = require(path.join(appDir, 'test', 'testdata.json'))
var testUsers = require(path.join(appDir, 'test', 'testusers.json'))

//functions
var rndInt = function (min, max) { return Math.floor(Math.random() * (max - min + 1) + min); } //use for making up times.

exports.userTestData = userTestData = function (u) {
//moves test users from test folder to results folder and adds to config file
  write.makeSimFiles("test")
  testUsers.forEach(function (el) {
    //for each user write out to userfile in results test folder.
    var now = Date.today()
    el.arrivaldatetime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), rndInt(07, 11), rndInt(0, 59), rndInt(0, 59))
    el.departuredatetime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), rndInt(13, 19), rndInt(0, 59), rndInt(0, 59))
    users.addUser(el, "test")
  }, this);
  return u;
}

exports.processUserData = processUserData = function (obj) {
// convert live users (from App) into simulation users
//move arrival time + departure into users 

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

exports.buildConfig = buildConfig =  function (simid) {
  //check if is test (blank body)
    //use appropriate config file.
  ////for test use testdata
  ////for live use 

  //this seems to duplicate the functions in route/api.ps | post 
  //probably could be tidied up..
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



exports.runSimulation = runSimulation =  function(configfile){
  //run the simulation code
  console.log("run simulation",configfile)
  return simulation.simulate(configfile)
}