
var path = require('path');
var express = require('express');
var js = require('graceful-fs');
var router = express.Router();
var conf = require("../sim_modules/config");
var appDir = conf.appRoot //config.path.dirname(require.main.filename);
require('datejs')
var simulation = require(path.join(appDir, 'sim_modules','simulation'))
var testData = require(path.join(appDir, 'test','testdata.json'))
var testUsers = require(path.join(appDir, 'test','testusers.json'))
var users = require (path.join(appDir,"sim_modules",'users'))
var write = require(path.join(appDir, "sim_modules", "logs"));
//var write = require (path.join(appDir,"sim_modules",'logs.js'))


var userTestData = function(u){//moves test users from test folder to results folder and adds to config file
	write.makeSimFiles("test")
	testUsers.forEach(function(el) {
		//for each user write out to userfile in results test folder..
		//write.makeSimFiles("test")
		var now = Date.today()
		el.arrivaldatetime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(07,11),rndInt(0,59),rndInt(0,59))
		el.departuredatetime =new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(13,19),rndInt(0,59),rndInt(0,59))
		users.addUser(el,"test")
	}, this);
	return u;
}

function rndInt(min,max){return Math.floor(Math.random()*(max-min+1)+min);}

function processUserData(obj){
	//move arrival time + departure into users 
	//model already exists..
    ////todo not ure what htis does!!!!!!!
	
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



	console.log(obj)
	return obj
}

/* GET api */

router.get('/',function(req,res){
	res.send("no route, use post")
});
router.post('/', function(req, res) {
	//if nothing posted then test - attached test users to config body
	//if postdata then find correct user list.
	var test = (Object.keys(req.body).length === 0);true;false;//check if any post data
	
	var config = test?userTestData(testData):req.body;
	
	//add users to config...
	var simID = test?"test":((config.simID == '' || config.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : config.simID)
	write.makeSimFiles(simID);

	var UData = JSON.parse(fs.readFileSync(write.folders.userFile));
	//process UDATA
	config.PCusers = UData;
	config = processUserData(config);///currently soes notthign!!!!
	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;