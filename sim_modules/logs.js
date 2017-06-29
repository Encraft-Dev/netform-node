var fs = require('graceful-fs')
var zlib = require('zlib')
var appDir = path.dirname(require.main.filename);
require("datejs")

exports.timelog = function(dirPath,name,data,zip){
	if (!fs.existsSync(dirPath)){
		    fs.mkdirSync(dirPath);
		}
	var dataout = JSON.stringify(data)

	if (zip){
		zlib.gzip(dataout, function (error, result) {
		   if (error) throw error;
		     fs.writeFile(path.format({dir:dirPath,base:name +".json.gz"}),result, function(err) {
			  if (err) throw err;
			  //console.log(name)
			})//writefile
		});//zlib
	}
	else {
		 fs.writeFile(path.format({dir:dirPath,base:name +".json"}),dataout, function(err) {
		  if (err) throw err;
		  //console.log(name)
		})//writefile
	}
}


exports.makeUserFiles = function(simid){
  //var simid = Date.today().toString("yyyy_MM_dd")
  var userFolder = path.join(appDir,"results",simid)
  var userFile = path.join(userFolder,"users.json")
  if (!fs.existsSync(userFolder)){fs.mkdirSync(userFolder)} // make folder 
  if (!fs.existsSync(userFile)){fs.writeFileSync(userFile,"[]")} // make usersfile 
  return true;
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