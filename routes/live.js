var path = require('path');

var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename);

//
var testData = require(path.join(appDir, 'test','testdata.json'))

/* GET api */
router.post('/', function(req, res) {
	//if no data passed in post data then run against testdata,,,,
	var config = (req.body.test)?require(path.join(appDir, 'test','testdata.json')):req.body
	console.log(config)
	//res.send(simulation.simulate(config));	
	//console.log(req.body)
	//var xsim = simulation.simulate(req.body)
  	//res.send(simulation.simulate(req.body,"live"));
});

module.exports = router;
