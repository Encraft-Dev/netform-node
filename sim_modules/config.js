var path = require('path');

exports.appRoot = path.dirname(require.main.filename);
exports.test = {
    "simName": "test",
    "data": path.join(path.dirname(require.main.filename), "test")
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