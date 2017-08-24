var emit = function(where, what, how){
    return new Promise(function(resolve, reject) {
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

var getUpdate = function(newDate){
    // currData = 'PAUSED';
    emit('user/'+thisCar.id, {}, "GET")
    .then(function(res){
        res=res[0]
        console.log(res)
        chartData.predicted = res.predicted;
        chartData.current = res.current;
        chartData.target = {charge: res.netformcharge}
        $('#resDate').html(moment(res.departuredatetime).format('HH:mm dd DD/MM/YYYY'))
        $('#resCharge').html(res.netformcharge+'%')
        $('#thisCar').html(thisCar.car.make + ' ' + thisCar.car.model);
        // console.log(newDate)
        if(!chartData.current.error){
            updateChart();
            currData = newDate;
        }
    })
}

var checkUpdate = function(){
    // if(currData != 'PAUSED'){        
        emit('api/systemStatus', {}, 'GET')
        .then(function(res){
            if(res.status != 1){
                if(currData === null || moment(currData).isBefore(res.lastrun)){
                    if(thisCar.id){
                        getUpdate(res.lastrun);
                    }
                }
            }
        })
    // }
}

$(document).ready(function(){
    setInterval(checkUpdate, 60000);
})