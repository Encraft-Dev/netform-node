
var path = require('path');
var express = require('express');
var js = require('graceful-fs');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
require('datejs')
var simulation = require(path.join(appDir, 'sim_modules','simulation'))
var testData = require(path.join(appDir, 'test','testdata.json'))
var users = require (path.join(appDir,"sim_modules",'users'))
var write = require(path.join(appDir, "sim_modules", "logs"));
//var write = require (path.join(appDir,"sim_modules",'logs.js'))


var userTestData = function(u){//moves test users from test folder to results folder
	u.testusers.forEach(function(el) {
		//for each user write out to userfile in results test folder..
		write.makeSimFiles("test")
		var now = Date.today()
		el.arrivaldatetime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(07,11),rndInt(0,59),rndInt(0,59))
		el.departuredatetime =new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(13,19),rndInt(0,59),rndInt(0,59))
		el.model = users.getModelfromId(el.vehicleId)
		users.addUser(el,"test")
	}, this);
	return u;
}

function rndInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}

function processUserData(obj){
	//move arrival time + departure into users 
	//model already exists..

	return rtnObj
}

/* GET api */
router.post('/', function(req, res) {
	//if nothing posted then test - attached test users to config body
	//if postdata then find correct user list.
	var test = (Object.keys(req.body).length === 0);true;false;//check if any post data
	var config = test?userTestData(testData):req.body;
	//add users to config...
	var simID = test?"test":((config.simID == '' || config.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : config.simID)
	//var simID = (u.simID == '' || u.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : u.simID//"biglog";
	write.makeSimFiles(simID);
	var UData = JSON.parse(fs.readFileSync(write.folders.userFile))
	//process UDATA

	config.PCusers = UData
	config = processUserData(config);
	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;