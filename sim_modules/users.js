var fs = require('graceful-fs')
var path = require('path');
var appDir = path.dirname(require.main.filename);
require('datejs')
var write = require (path.join(appDir,"sim_modules",'logs.js'))

// var addUser = function(obj){
//   var simid = Date.today().toString("yyyy_MM_dd")
//   var userFolder = path.join(appDir,"results",simid)
//   var userFile = path.join(userFolder,"users.json")
//   if (!fs.existsSync(userFolder)){fs.mkdirSync(userFolder)} // make folder 
//   if (!fs.existsSync(userFile)){users={}} // make folder 
//   // check if user already exists
//   var users =  require(userFile)
//   userExists=users.findIndex(function (el) {return el.uid == obj.uid;})
//   console.log(userExists)
//   if(userExists==-1){
//     createUser(userFolder,users,obj)
//   }
//   else{updateUser(obj)}
//   console.log(users,obj)

  
// }

// var createUser = function(userFolder,users,obj){
//     users.push(obj)
//     write.timelog(userFolder,"users",users,false)
// }

// var updateUser = function(obj){console.log("update")}

var addUser = exports.addUser = function(obj){
  console.log("add user")
  var simid = Date.today().toString("yyyy_MM_dd")
  write.makeSimFiles(simid)
  var users =  JSON.parse(fs.readFileSync(write.folders.userFile))
  userExists=users.findIndex(function (el) {return el.uid == obj.uid;})
  userExists==-1?createUser(write.folders.sim,users,obj):updateUser(write.folders.sim,users,obj,userExists)
  return "user added/updated"
}

var createUser = function(userFolder,users,obj){
    console.log("create user")
    users.push(obj)
    write.timelog(userFolder,"users",users,false)
    return true
}

var updateUser = function(userFolder,users,obj,updateIndex){
  console.log("update")
  users[updateIndex]=obj
  write.timelog(userFolder,"users",users,false)
  return true
}