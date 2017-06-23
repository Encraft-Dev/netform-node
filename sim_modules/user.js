var fs = require('graceful-fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);
require('datejs')


var addUser = function(obj){
  var simid = Date.today().toString("yyyy_MM_dd")
  var userFolder = path.join(appDir,"results",simid)
  var userFile = path.join(userFolder,"users.json")
  if (!fs.existsSync(userFolder)){fs.mkdirSync(userFolder)} // make folder 
  if (!fs.existsSync(userFile)){users={}} // make folder 
  // check if user already exists
  var users =  require(userFile)
  userExists=users.findIndex(function (el) {return el.uid == obj.uid;})
  console.log(userExists)
  if(userExists==-1){
    createUser(userFolder,users,obj)
  }
  else{updateUser(obj)}
  console.log(users,obj)

  
}

var createUser = function(userFolder,users,obj){
    users.push(obj)
    write.timelog(userFolder,"users",users,false)
}

var updateUser = function(obj){console.log("update")}