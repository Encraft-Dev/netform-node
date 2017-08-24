var path = require('path');
var fs = require('graceful-fs')
var appRoot = exports.appRoot = path.dirname(require.main.filename);
exports.dataRoot = dataRoot =  process.env.OPENSHIFT_DATA_DIR || appRoot;

exports.test = {
    "simName": "test",
    "data": path.join(appRoot, "test")
}

//TODO:  get config files (discharge profiles,config,constraints) from persistant data..
// confpath = path.join(dataRoot,"simconfig.json")
// if(!fs.existsSync(confpath)){

// }
// var simdataconfig = JSON.parse(fs.readFileSync(path.join(dataRoot,"simconfig.json")))
var tmpData = {// used to run auto sims for user testing
    "simID": "",
    "simLength": "1440",
    "simSlots": "250",
    "simSeed": "1234",
    "allowConstraints": "on",
    "constraintsExportCap": "500000",
    "constraintsImportCap": "500000",
    "eventsDischarge": "on",
    "allowSlowCharge": "on",
    "solarCap": "200",
    "solarOut": "175800"
}

exports.simData = {// used to run auto sims for user testing
    "simID": "",
    "simLength": "1440",
    "simSlots": "250",
    "simSeed": "1234",
    "allowConstraints": "on",
    "constraintsExportCap": "500000",
    "constraintsImportCap": "500000",
    "eventsDischarge": "on",
    "allowSlowCharge": "on",
    "solarCap": "200",
    "solarOut": "175800"
}