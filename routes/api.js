
var path = require('path');
var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var simulation = require(path.join(appDir, 'sim_modules','simulation.js'))

var testData = require(path.join(appDir, 'test','testdata.json'))


/* GET api */
router.post('/', function(req, res) {
	var config = (Object.keys(req.body).length === 0)?testData:req.body;
  	res.send(simulation.simulate(config));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;
