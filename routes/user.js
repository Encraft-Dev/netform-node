const express = require('express');
         path = require('path');
       router = express.Router();
         zlib = require('zlib')
          Ajv = require('ajv');
           fs = require('graceful-fs')
          MD5 = require('md5')
                require('datejs')
var   conf        = require("../sim_modules/config"),
      appDir      = conf.appRoot,
      userDataDir = conf.dataRoot+'/userData/';

var write = require (path.join(appDir,"sim_modules",'logs.js'))
var users = require (path.join(appDir,"sim_modules",'users.js'))
//var timef = require(path.join(appDir,"sim_modules",'logs.js'))

var simid = Date.today().toString("yyyy_MM_dd")
write.makeSimFiles(simid)

/* GET users listing. */
router.get('/',function(req,res,next){
  //list all users in current day

  var simid = Date.today().toString("yyyy_MM_dd")
  write.makeSimFiles(simid)

  var data = JSON.parse(fs.readFileSync(path.join(write.folders.sim,"users.json")));// require(path.join(appDir,"results",simid,"users.json"))
  res.send(data);
});
//return template format
// router.get('/add', function(req, res, next) {
//   var data = require(path.join(appDir,"data","Users","template.json"))
//   res.send(data);
// });

// router.post('/add',function(req,res,next){
//   var schema = require(path.join(appDir,"data","Users","template.json"))
//   var data = req.body;
//   var ajv = new Ajv({allErrors: true});
//   var valid = ajv.validate(schema, data);

//   output  = valid ? {'Accepted':'check back in a while to once the sim has run again'} : ajv.errorsText(validate.errors)
//   valid?users.addUser(data):false
//   res.send(output);

// });

router.post('/updateActivity',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  // console.log("he",req.body)
  var tID = req.body.id
  // console.log(fs.readFileSync(userDataDir+tID+'.json','utf8'))
  if (fs.existsSync(userDataDir+tID+'.json')){
     tFile = JSON.parse(fs.readFileSync(userDataDir+tID+'.json','utf8'));
     var simid = Date.today().toString("yyyy_MM_dd")
     tFile.car = req.body.car
     req.body.current.car = req.body.car;
     req.body.current.id = req.body.id;
     tFile.activity.push(req.body.current);
    //  fs.writeFileSync(userDataDir+tID+'.json', JSON.stringify(tFile));
    console.log("tfile",tFile)
    fs.writeFile(userDataDir+tID+'.json', JSON.stringify(tFile), 'utf-8', function (err) {
        if (err) {
          // res.send("failed to save");
        } else {
          // res.send(tFile);
          users.getUsersfromUserdata();
        }
      })
  }else{
    res.send({error:'NOt a user'});
  }
  res.send(output);

});


// router.post('/update', function(req, res, next) {
//   var schema = require(path.join(appDir,"data","Users","template.json"))
//   var data = req.body
//   data.arrivaldatetime = timef.getSimTimefromISOtime(data.HTMLarrivaldatetime);
//   data.departuredatetime = timef.getSimTimefromISOtime(data.HTMLdeparturedatetime);
//   //check if input is valid against schema
//   var ajv = new Ajv({allErrors: true});
//   var validate = ajv.compile(schema);
//   var valid = validate(data);

//   output  = valid ? "Accepted:check back in a while to once the sim has run again" : ajv.errorsText(validate.errors)
//   //add to user list
//   valid?users.addUser(data):false
//   res.send(output);

// });

router.post('/generateId', function(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Content-Type', 'application/json');
  var tID = MD5(req.body.email);
  var tFile;
  if (!fs.existsSync(userDataDir)){fs.mkdirSync(userDataDir)} // make folder 
  if (!fs.existsSync(userDataDir+tID+'.json')){
    tFile = {id: tID, email : req.body.email, phone : req.body.phone, car : {}, activity : [], survey:[]}
    console.log(tFile)
    fs.writeFileSync(userDataDir+tID+'.json', JSON.stringify(tFile))
   res.send(tFile);
  }else{
    tFile = fs.readFileSync(userDataDir+tID+'.json');
    if(tFile.email != req.body.email || tFile.phone != req.body.phone){
      tFile.email = req.body.email;
      tFile.phone = req.body.phone;
      fs.writeFileSync(userDataDir+tID+'.json', JSON.stringify(tFile));
    }
    res.send(tFile)
  }
});

router.get('/:id/:time',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(write.folders.veh,req.params.time+".json.gz"))));
  var userid = req.params.id
  console.log(data,userid)
  // check for user existing
  output = data.filter(function (el) {return el.nfAppId == userid;})
  res.send(output);
});

router.post('/:id',function(req,res,next){
  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
  var data = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(write.folders.veh,req.params.time+".json.gz"))));
  var userid = req.body.id
  var time = new Date(req.body.time)
  // check for user existing
  output = data.filter(function (el) {return el.nfAppId == userid;})

  res.send(output);
});

router.get('/:id',function(req,res,next){
 
  cTime = (parseInt(write.getSimTimefromISOtime(new Date().toISOString()))+1)
console.log(cTime, write.folders.veh)
  if(!fs.existsSync(path.join(write.folders.veh,cTime+".json.gz"))){
    res.send({error: 'no data'});
    return false;
  }

  //list all users in current day
  var simid = Date.today().toString("yyyy_MM_dd")
    write.makeSimFiles(simid)
  var data = JSON.parse(fs.readFileSync(write.folders.userFile));
  var userid = req.params.id
  console.log(userid)
  // check for user existing
  output = userid?data.filter(function (el) {return el.uid == userid;}):data
//get current time...
  console.log(output)
  //
  if(output.length < 1){
    res.send({});
    return false;
  }
  dTime = parseInt(write.getSimTimefromISOtime(output[0].departuredatetime))

  var cData = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(write.folders.veh,cTime+".json.gz"))));
  console.log(cData, cTime)
  cData = cData.filter(function (el) {return el.nfAppId == userid;})
  console.log(cData)
  if(cData.length == 0){
    cData = {error: 'not found'}
  }else{
    cData = {charge:cData[0].percent,rate:cData[0].rate}
  }
  
  var dData = JSON.parse(zlib.unzipSync(fs.readFileSync(path.join(write.folders.veh,dTime+".json.gz"))));
  dData = dData.filter(function (el) {return el.nfAppId == userid;})
  dData = {charge:dData[0].percent,rate:dData[0].rate}
  
  output[0].current= cData         
  output[0].predicted = dData
  output[0].finance = {saving:100}          
 output[0].graph = {0:1,1:2}           
//find current charge

  res.send(output);
});

module.exports = router;
