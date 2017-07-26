
var path = require('path');
var express = require('express');
var js = require('graceful-fs');
var router = express.Router();
var conf = require("../sim_modules/config");
var appDir = conf.appRoot //config.path.dirname(require.main.filename);
require('datejs')
var simulation = require(path.join(appDir, 'sim_modules','simulation'))
var apifunction = require(path.join(appDir, 'sim_modules','api_functions'))
var testData = require(path.join(appDir, 'test','testdata.json'))
var testUsers = require(path.join(appDir, 'test','testusers.json'))
var users = require (path.join(appDir,"sim_modules",'users'))
var write = require(path.join(appDir, "sim_modules", "logs"));


/* GET api */

router.get('/',function(req,res){
	res.send("no route, use post")
});
router.post('/', function(req, res) {
	//if nothing posted then test - attached test users to config body
	//if postdata then find correct user list.
	var test = (Object.keys(req.body).length === 0);true;false;//check if any post data
	
	var config = test?apifunction.userTestData(testData):req.body;
	
	//add users to config...
	var simID = test?"test":((config.simID == '' || config.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : config.simID)
	write.makeSimFiles(simID);

	var UData = JSON.parse(fs.readFileSync(write.folders.userFile));
	//process UDATA
	config.PCusers = UData;
	config = apifunction.processUserData(config);//
	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

router.get('/systemStatus', function(req,res){
  res.header("Access-Control-Allow-Origin", "*");  
  res.send(global.sysStatus);
});

module.exports = router;