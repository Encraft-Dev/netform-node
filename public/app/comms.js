var emit = function(where, what, how){
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: how || "POST",
            url: 'http://netform.encraft.co.uk/'+where,
            data: what,
            success: function(data){
                return resolve(data);
            },
            // error: function(err){
            //     reject(err);
            // },
            dataType: 'json'
        });
    });
}

var emptyProm = function(data){
    return new Promise(function(resolve, reject) {
        resolve(data);
    })
}

var getUpdates = function(){
    emit('api/systemStatus', {}, 'GET')
    .then(function(res){
        console.log(res);
    })
}

$(document).ready(function(){
    getUpdates();
    setInterval(getUpdates, 10000);
})