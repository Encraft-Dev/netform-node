var path = require('path');

var appRoot = exports.appRoot = path.dirname(require.main.filename);
exports.dataRoot = process.env.OPENSHIFT_DATA_DIR || appRoot;

exports.test = {
    "simName": "test",
    "data": path.join(appRoot, "test")
}
exports.simData = {// used to run auto sims for user testing
    "simID": "",
    "simLength": "1440",
    "simSlots": "30",
    "simSeed": "1234",
    "allowConstraints": "on",
    "constraintsExportCap": "500000",
    "constraintsImportCap": "500000",
    "eventsDischarge": "on",
    "allowSlowCharge": "on",
    "solarCap": "200",
    "solarOut": "175800"
}