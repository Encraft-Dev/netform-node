var fs = require('graceful-fs')
var zlib = require('zlib')
var appDir = path.dirname(require.main.filename);
require("datejs")


var folders = exports.folders = {
	'results':"",
	'sim':"",
	'user':"",
	'userFile':""
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
  folders.results = path.join(appDir,"results")//check results root exists
  folders.sim = path.join(folders.results,simid) // check sim folder exists
  folders.userFile = path.join(folders.sim,"users.json")//ensure users file exists
  if (!fs.existsSync(folders.results)){fs.mkdirSync(folders.results)} // make folder 
  if (!fs.existsSync(folders.sim)){fs.mkdirSync(folders.sim)} // make folder 
  if (!fs.existsSync(folders.userFile)){fs.writeFileSync(folders.userFile,"[]")} // make usersfile 
  return folders.sim ;//true;
}


exports.getSimTimefromISOtime = function(ISOtime){
	//get midnight for day
	var now = new Date(ISOtime)
	var midnight =  new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)

	diff = now - midnight
	minDiff = diff/(1000*60) //difference in minutes
	simtime=Math.ciel(minDiff)
	return simtime
}

exports.getRealtimefromSimtime = function(simtime){
	now = new Date()
	midnight = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)
	time = midnight.addMinutes(simtime)
	return time
}