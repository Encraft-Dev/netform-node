
var path = require('path');
var express = require('express');
var router = express.Router();
var appDir = path.dirname(require.main.filename);
var simulation = require(path.join(appDir, 'sim_modules','simulation.js'))







/* GET api */
router.post('/', function(req, res) {


  	res.send(simulation.simulate(req.body));//res.send(simulation.simulate(req.body,req.query.sId));
});

module.exports = router;
