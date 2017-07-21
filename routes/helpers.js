var express = require('express');
var path = require('path');
var router = express.Router();

var conf = require("../sim_modules/config");
var appDir = conf.appRoot;
var timef = require(path.join(appDir,"sim_modules",'logs.js'))




router.get('/isotosim/:time',function(req,res,next){
  simtime = timef.getSimTimefromISOtime(req.params.time)
  res.send([simtime]);
});

router.get('/simtoiso/:time',function(req,res,next){
  isotime = timef.getRealtimefromSimtime(req.params.time)
  res.send([isotime]);
});

module.exports = router;
