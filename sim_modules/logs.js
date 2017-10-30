var fs = require('graceful-fs')
 var fsUtils = require("nodejs-fs-utils");
var zlib = require('zlib')
var config = require("./config")
var appDir = config.appRoot//path.dirname(require.main.filename);
var dataRoot = config.dataRoot
var data_folder = process.env.OPENSHIFT_DATA_DIR || appDir;

require("datejs")

//provided easy?! access to the simulation output file routes (overly complicated)
////requires makesimFiles() \|/ to be called at least once udring the simulation/user/data process
var folders = exports.folders = {
	'results':"",
	'sim':"",
	'user':"",
	'userFile':"",
	'veh':"",
	'sys':"",
	'data':""
};

//sets up the file system for the simulation...this could probly be done only in the simulation, but hey its now done complicatedly everywhere!!!
//uses sync version of fs stuff
exports.makeSimFiles = function(simid){
	//write paths for folders
	folders.data= path.join(appDir,"data");
	folders.results = path.join(dataRoot,"results");//check results root exists
	folders.sim = path.join(folders.results,simid); // check sim folder exists
	folders.veh = path.join(folders.sim,"veh");
	folders.sys = path.join(folders.sim,"system");
	
	//write paths for files
	folders.userFile = path.join(folders.sim,"users.json");//ensure sim users file exists
	
	//write out folders
	if (!fs.existsSync(folders.results)){fs.mkdirSync(folders.results)};
	if (!fs.existsSync(folders.sim)){fs.mkdirSync(folders.sim)};
	if (!fs.existsSync(folders.veh)){fs.mkdirSync(folders.veh)};
	if (!fs.existsSync(folders.sys)){fs.mkdirSync(folders.sys)};

	//write out files
	// make usersfile with blank array if doesnt exist. users can be added to live sim continously so doesnt get written over
	if (!fs.existsSync(folders.userFile)){fs.writeFileSync(folders.userFile,"[]")}; 

  return folders.sim ;
}



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
	var simfile = path.join(dataRoot,"sim_status.json")
	var simdate = new Date()
	fsize=0;
	console.log("simstatus",dataRoot)
	fsize = (fs.existsSync(path.join(dataRoot,"results")))?fsUtils.fsizeSync(path.join(dataRoot,"results"))/1000000:0
	userCount = (fs.existsSync(path.join(dataRoot,"userData")))?fs.readdirSync(path.join(dataRoot,"userData")).length:0
	//console.log(fs.readdirSync(path.join(dataRoot,"userData")).length
	fs.writeFileSync(simfile,JSON.stringify({"lastrun":simdate.toISOString(),"status":status,Users:userCount,dataSizeonDisk:fsize})) // make usersfile 
}