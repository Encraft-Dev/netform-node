
var system = {
	time:0,
	init:true
}

function vehicle (id){
	this.id=id;
	this.charge_state=20;
	this.charge_rate=2;
	this.discharge_rate=4;
	this.capacity=60;
	this.user = {
		timeend:10,
		capacity:60
	};
	//this.netform_factor = function(){return netformFactor(this.charge_state,this.user.timeend,this.user.capacity,this.charge_rate)}
	this.netform_factor = netformFactor;
}


function netformFactor (){//factor of requirement to charge for bidding system
var nF = 0;
time_to_end = this.user.timeend-system.time;
nF=((this.user.capacity-this.charge_state)*this.charge_rate)/time_to_end;
return 1/nF
}

var arr=[]
//initialise lots of vehicles
	if(system.init==true){
		
			for  (i = 1 ; i<10 ; i++) {
			a = new vehicle(i)
			a.charge_state= Math.floor(Math.random() * 50) + 10 ; //make charge condition random
			arr[i]=a;
			system.init=false;
			}

}




function increment(){
var bidarr=[]
//update netform factor


//run vehicle update loop
//check each vehicle for netformFactor and add to priority array
	arr.forEach(function(veh){
		console.log(veh.id,veh.netform_factor());
		bidarr.push(veh.netform_factor());

	});

	bidarr.sort(compareNumbers)
	console.log(bidarr)
}

//if vehicle is leaving then remove from array charging point array.


//


function compareNumbers(a, b) {
  return a - b;
}
