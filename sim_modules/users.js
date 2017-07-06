var fs = require('graceful-fs')
var path = require('path');

var appDir = path.dirname(require.main.filename);
require('datejs')

var write = require (path.join(appDir,"sim_modules",'logs.js'))
var models = require (path.join(appDir,"data",'vehicles.json'))

exports.addUser = function(obj,sim){
  var simid = sim?sim:Date.today().toString("yyyy_MM_dd")
  console.log("addUser",sim,obj)
  write.makeSimFiles(simid)
  var users =  JSON.parse(fs.readFileSync(write.folders.userFile,"utf8"))
  userExists=users.findIndex(function (el) {return el.uid == obj.uid;})
  userExists==-1?createUser(write.folders.sim,users,obj):updateUser(write.folders.sim,users,obj,userExists)
  return "user added/updated"
}

exports.getModelfromId = function(id){ return models.filter(function (el) {return el.id == id;})}

var createUser = function(userFolder,users,obj){
    console.log("create user",obj)
    obj.model = getModelfromId(obj.vehicleId);
    users.push(obj)
    write.timelog(userFolder,"users",users,false)
    return true
}

var updateUser = function(userFolder,users,obj,updateIndex){
  console.log("update",obj)
  users[updateIndex]=obj
  console.log("updatelist",obj,users)
  write.timelog(userFolder,"users",users,false)
  return true
}