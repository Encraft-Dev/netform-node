var express = require('express');
var router = express.Router();
var simulation = require('../sim_modules/simulation.js')

/* GET api */
router.post('/', function(req, res) {
	
	//console.log(req.body)
	//var xsim = simulation.simulate(req.body)
  	res.send(simulation.simulate(req.body));
});

module.exports = router;
