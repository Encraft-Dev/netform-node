
var path = require('path');
var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var simulation = require(path.join(appDir, 'sim_modules','simulation.js'))
var testData = require(path.join(appDir, 'test','testdata.json'))
var users = require (path.join(appDir,"sim_modules",'users.js'))

/* GET api */
router.post('/', function(req, res) {
	
	var test = (Object.keys(req.body).length === 0);true;false;
	var config = test?testData:req.body;
	
	//need to check each user for types etc.
	//catch test and user data here.
	if(test) {config=userTestData(config.testusers)};
	//console.log(config)  
	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;


var userTestData = function(u){
	u.forEach(function(el) {
		
	}, this);
	//write out user to files for test
}