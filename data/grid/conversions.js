var M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
var E = [];
var a = 0; //entry time
var Em = {};
M.forEach(function(m){

console.log(m)
    for (var i=0;i<1440;i++){
    console.log(i)
        if(x[i][m]==0){a=i+1;continue;}
        if (i==1439){E.push({"start":a,"stop":i,"type":x[i][m]});break;  }	
        if (x[i][m]!=x[i+1][m]){
            E.push({"start":a,"stop":i,"type":x[i][m]})
            a=i
            }


	}; //for

    Em[m]=E
    E=[]
});


    
  
  
  //console.log(x[i].Jan)


console.log(JSON.stringify(Em))