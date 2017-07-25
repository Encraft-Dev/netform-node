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