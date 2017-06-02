var express = require('express');
var router = express.Router();

var sim = require('simjs')
var data = require('../sim_modules/data.js')
console.log("jkh")

/* GET api */
router.get('/', function(req, res, next) {
  res.send('return sim object');
});

module.exports = router;
