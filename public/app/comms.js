var emit = function(where, what, how){
    return new Promise(function(resolve, reject) {
        console.log("Emit:",what);
        $.ajax({
            type: how || "POST",
            url: '/'+where,
            data: JSON.stringify(what),  //JL -had to stringify the json to get object to work correctly!
            success: function(data){
                return resolve(data);
            },
            // error: function(err){
            //     reject(err);
            // },
            contentType:'application/json',
            dataType: 'json'
        });
    });
}

var emptyProm = function(data){
    return new Promise(function(resolve, reject) {
        resolve(data);
    })
}


var currData = null;

var getUpdate = function(newDate){
    currData = 'PAUSED';
    emit('')
    .then(function(res){
        updateChart();
        currData = newDate;
    })
}

var checkUpdate = function(){
    if(currData != 'PAUSED'){        
        emit('api/systemStatus', {}, 'GET')
        .then(function(res){
            if(res != 'READY' && res != 'SIM RUNNING'){
                if(moment(currData).isBefore(res)){
                    getUpdate(res);
                }
            }
        })
    }
}

$(document).ready(function(){
    // getUpdate();
    // setInterval(checkUpdate, 10000);
})