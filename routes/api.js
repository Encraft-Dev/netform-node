var express = require('express');
var router = express.Router();

//var simulation = require('simjs')
// var cModes = require('../data/charging_modes.json')
// var vArr = require('../data/vehicles.json')
// var uArr = require('../data/user_types.json')
// var profile_solar = require('../data/profile_solar.json')
// var API_MCS24 = require('../data/PV_API.json')
// var CP= require('../data/profile_parking.json')
// var testData = require('../test/testdata.json')
// set default cp for now..//
//CP=CP.commuterCP

var simulation = require('../sim_modules/simulation.js')




// function runSimulation(values){//run the sim with input data..
// 	//if no values then get default test data.
// 	values = (values==undefined)?values=testData:values
// 	//run sim get result object..
// 	return simulation.simulate(values)
// }








/* GET api */
router.post('/', function(req, res) {
	
	//console.log(req.body)
	//var xsim = simulation.simulate(req.body)
  	res.send(simulation.simulate(req.body));
});

module.exports = router;
