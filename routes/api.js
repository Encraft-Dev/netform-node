
var path = require('path');
var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
require('datejs')
var simulation = require(path.join(appDir, 'sim_modules','simulation.js'))
var testData = require(path.join(appDir, 'test','testdata.json'))
var users = require (path.join(appDir,"sim_modules",'users.js'))
//var write = require (path.join(appDir,"sim_modules",'logs.js'))


var userTestData = function(u){
	u.testusers.forEach(function(el) {
		//console.log("api",el)
		//for each user write out to file..
		var now = Date.today()
		el.arrivaldatetime = new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(07,11),rndInt(0,59),rndInt(0,59))
		el.departuredatetime =new Date(now.getFullYear(),now.getMonth(),now.getDate(),rndInt(13,19),rndInt(0,59),rndInt(0,59))
		el.model = users.getModelfromId(el.vehicleId)
		users.addUser(el)
	}, this);
	return u;
	//write out user to files for test
}

function rndInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


/* GET api */
router.post('/', function(req, res) {
	
	var test = (Object.keys(req.body).length === 0);true;false;
	var config = test?userTestData(testData):req.body;
	
	//config = test?userTestData(config.testusers):config
	//console.log(config)  
	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;