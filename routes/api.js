
var        path = require('path');
var     express = require('express');
var          js = require('graceful-fs');
var      router = express.Router();
var        conf = require("../sim_modules/config");
var      appDir = conf.appRoot //config.path.dirname(require.main.filename);
                 require('datejs')

var apifunction = require(path.join(appDir, 'sim_modules','api_functions'))
var    testData = require(path.join(appDir, 'test','testdata.json'))
var   testUsers = require(path.join(appDir, 'test','testusers.json'))
var       users = require (path.join(appDir,"sim_modules",'users'))
var       write = require(path.join(appDir, "sim_modules", "logs"));


/* GET api */

router.get('/',function(req,res){
	res.send("no route, use post")
});


router.post('/', function(req, res) {
//provides route to  configure the simulation 
//this deals with getting the correct user set (live,test,simulation), simulation naming, data choice etc.
//user users in test folder for test type. 
//uses users in app folder for live; live sim id is todays date
//uses config sent for other.

	//if nothing posted (post object is empty) then use test config and test users : attach test users to config body
	var test = (Object.keys(req.body).length === 0);true;false;
	
	//if test then add test config file to  sim config... from /TEST
	var config = test?apifunction.userTestData(testData):req.body;
	
	//set sim id (test if test, postdata id if exists, todays date otherwise)
	var simID = test?"test":((config.simID == '' || config.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : config.simID)
	
	//set up sim folder structure
	write.makeSimFiles(simID);

	//add users from the user file assocatied with the sim id (if first time will be blank) and add them to the sim comfig object (maily for live and t)
	var UData = JSON.parse(fs.readFileSync(write.folders.userFile));
	

	//if postdata exists then find correct user list (mainly for live date simulations) and add to sim config object
	config.PCusers = UData;
	
	//convert live users (from app or test) into simulation users (mainly timecodes into sim times)
	config = apifunction.processUserData(config);

	//return the resutls from the simulation
	res.send(apifunction.runSimulation(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

router.get('/userlist', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");  
	var out  = users.getUsersfromUserdata()
	console.log(out)
	res.send(out)
	//	res.send(js.readFileSync(path.join(conf.appRoot,"data","sim_status.json")));
  });

router.get('/eventslist', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");  
	var list = fs.readdirSync(path.join(conf.appRoot,"data","events"))
	list.forEach(function(l,i){
		list[i]=l.replace(".json","")
	})

	res.send(list)
});

router.get('/systemStatus', function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Content-type", "application/json");   
 console.log("dataroute",conf.dataRoot)
//   write.setSimStatus();
  res.send(js.readFileSync(path.join(conf.dataRoot,"sim_status.json")));
});

module.exports = router;