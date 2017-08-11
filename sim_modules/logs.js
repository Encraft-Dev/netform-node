var fs = require('graceful-fs')
var zlib = require('zlib')
var config = require("./config")
var appDir = config.appRoot//path.dirname(require.main.filename);
var dataRoot = config.dataRoot
var data_folder = process.env.OPENSHIFT_DATA_DIR || appDir;

require("datejs")

var folders = exports.folders = {//requires makesimFiles() to be called at least once udring the simulation/user/data process
	'results':"",
	'sim':"",
	'user':"",
	'userFile':"",
	'veh':"",
	'sys':""
};


exports.timelog = function(dirPath,name,data,zip){
	if (!fs.existsSync(dirPath)){
		    fs.mkdirSync(dirPath);
		}
	var dataout = JSON.stringify(data)

	if (zip){
		zlib.gzip(dataout, function (error, result) {
		   if (error) throw error;
		     fs.writeFileSync(path.format({dir:dirPath,base:name +".json.gz"}),result)//writefile
		});//zlib
	}
	else {
		 fs.writeFileSync(path.format({dir:dirPath,base:name +".json"}),dataout)//writefile
	}
}

// exports.resultsFolder = function(){
// 	resultsF = path.join(appDir,"results")
// 	if (!fs.existsSync(resultsF)){fs.mkdirSync(resultsF)}
// 	return resultsF;
// }

exports.makeSimFiles = function(simid){
	//var simid = Date.today().toString("yyyy_MM_dd")
	folders.results = path.join(dataRoot,"results")//check results root exists
	folders.sim = path.join(folders.results,simid) // check sim folder exists
	folders.userFile = path.join(folders.sim,"users.json")//ensure users file exists
	if (!fs.existsSync(folders.results)){fs.mkdirSync(folders.results)} // make folder 
	if (!fs.existsSync(folders.sim)){fs.mkdirSync(folders.sim)} // make folder 
	if (!fs.existsSync(folders.userFile)){fs.writeFileSync(folders.userFile,"[]")} // make usersfile 

  	folders.veh = path.join(folders.sim,"veh")
	folders.sys = path.join(folders.sim,"system")
	//var userdir = path.join(simFolder,"PCusers")
	if (!fs.existsSync(folders.veh)){fs.mkdirSync(folders.veh)}
	if (!fs.existsSync(folders.sys)){fs.mkdirSync(folders.sys)}
	//if (!fs.existsSync(userdir)){fs.mkdirSync(userdir)}


  //make test folders for test
//   folder.test = path.join(folders.results,"test")
//   folders.testUserFile = path.join(folders.test,"users.json")//ensure users file exists 
//   if (!fs.existsSync(folders.test)){fs.mkdirSync(folders.test)} // make folder 
//   if (!fs.existsSync(folders.testUserFile)){fs.writeFileSync(folders.testUserFile,"[]")} // make usersfile 

  return folders.sim ;//true;
}


exports.getSimTimefromISOtime = function(ISOtime){
	//get midnight for day
	var now = new Date(ISOtime)
	var midnight =  new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)

	diff = now - midnight
	minDiff = diff/(1000*60) //difference in minutes
	simtime=minDiff;//Math.ceil(minDiff)
	return simtime
}

exports.getRealtimefromSimtime = function(simtime){
	console.log(simtime)
	now = new Date()
	midnight = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)
	time = midnight.addMinutes(simtime)
	
	return time
}

exports.setSimStatus = function(status=0){
	//write to simstatus file indata
	var simfile = path.join(config.appRoot,"data","sim_status.json")
	var simdate = new Date()
	//console.log(fs.readdirSync(path.join(dataRoot,"userData")).length
	fs.writeFileSync(simfile,JSON.stringify({"lastrun":simdate.toISOString(),"status":status,Users:fs.readdirSync(path.join(dataRoot,"userData")).length})) // make usersfile 
}