const     fs = require('graceful-fs');
        path = require('path');
        conf = require("./config");
      appDir = conf.appRoot; //path.dirname(require.main.filename);
    dataRoot = conf.dataRoot;          
       write = require(path.join(appDir, "sim_modules", 'logs'));
      models = require(path.join(appDir, "data", 'vehicles.json'));
 apifunction = require(path.join(appDir, 'sim_modules','api_functions'));
               require('datejs');


exports.getUsersfromUserdata = function(){
  //loop through the available users and a to user array
  var filelist = fs.readdirSync(path.join(dataRoot,"userData"))
  var out = []
  filelist.forEach(function(f, i) {
    if(f[0] != '.'){
      console.log(path.join(dataRoot,"userData",f));
      var fu = (JSON.parse(fs.readFileSync(path.join(dataRoot,"userData",f), "utf8")))
      console.log(fu)
      try {
        if(fu.activity.length>=1){
          thisCarData = fu.activity.slice(-1)[0]
          thisCarData.model = getModelfromId(thisCarData.car.id);
          out.push(thisCarData)
        }
      } catch (error) {
        console.log(error)
      }
      //for each get last activity and add to array
    }
    // var fu = JSON.parse(fs.readFileSync(path.join(dataRoot,"userData",f), "utf8"))
  });
  out=convertuser(out)
  //write out to simulation file
  var simid = Date.today().toString("yyyy_MM_dd")
  write.makeSimFiles(simid);//make sure files exist
  write.timelog(write.folders.sim, "users", out, false)
  
  return apifunction.runSimulation(apifunction.buildConfig(simid));
}

exports.convertAppUserstoSimUsers = convertuser = function(actList){
  var out=[]
    actList.forEach(function(u) {
     console.log(u)
      o = {
        "uid": u.id,
        "arrivaldatetime": u.arrDate,
        "departuredatetime":u.retDate,
        "vehicleId":u.car.id,
        "netformcharge": u.chargePerc
      }
      out.push(o);
    }, this);
//console.log(out)

return out;
  }



exports.addUser = function (obj, sim) {
  var simid = sim ? sim : Date.today().toString("yyyy_MM_dd")
  //console.log("addUser",sim,obj)
  write.makeSimFiles(simid);
  var users = JSON.parse(fs.readFileSync(write.folders.userFile, "utf8"));
  userExists = users.findIndex(function (el) { return el.uid == obj.uid; });
  userExists == -1 ? createUser(write.folders.sim, users, obj) : updateUser(write.folders.sim, users, obj, userExists);
  //apifunction.runSimulation(simid);
  return "user added/updated"
}

exports.getModelfromId = getModelfromId = function (id) {
  o = models.filter(function (el) { return el.id == id; })
  return o[0]
}

var createUser = function (userFolder, users, obj) {
  // console.log("create user",obj)
  obj.model = getModelfromId(obj.vehicleId);
  users.push(obj)
  write.timelog(userFolder, "users", users, false)
  return true
}

var updateUser = function (userFolder, users, obj, updateIndex) {
  //console.log("update",obj)
  users[updateIndex] = obj
  // console.log("updatelist",obj,users)
  write.timelog(userFolder, "users", users, false)
  return true
}
