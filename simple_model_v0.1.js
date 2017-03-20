//set system variables
var simulation = {
	length:200,
	speed:500 //used in tick timeout
}

var system = {
	plot:{x:[],y:[],type:"scatter"},
	log:[],
	paused:true,
	time:0,
	spaces:40,
	capacity:0,
	charge_rate:0,
	slots:[],
	vehicles:[],
	profile:0.9,
    init:function(){//make parking space with full slots available
    	for (i=0;i<this.spaces;i++){
    		s = new slot(i)
    		this.slots.push(s)};
    },
    run:function(){runsystem()},
    tick:function(){this.time++; this.time < simulation.length ? this.run() : console.log("simulation end");}
}

//set objects
function slot (id){//parking slot
	this.id=id;
	this.available=true;
	this.vehicle=null
}
//system.spaces;
//console.log(system.spaces)

function vehicle (id){//vehicle
	this.id=id;
	this.status="Parked";
	this.charge_state=20;
	this.charge_rate=2;
	this.discharge_rate=4;
	this.capacity=60;
	this.user = {
		timestart:0,
		timeend:10,
		capacity:60
	};
	//this.netform_factor = function(){return netformFactor(this.charge_state,this.user.timeend,this.user.capacity,this.charge_rate)}
	this.netform_factor = netformFactor;
	this.init=function(){
			this.charge_state= Math.floor(Math.random() * 50) + 10 ; //make charge condition random (10-50)
			this.user.timeend =  system.time + Math.floor(Math.random() * 100) + 1 ; //make endtime condition random (10-100)
			this.user.timestart = system.time
		}
}

//run system
system.init();
//system.run();

//help functions
function runsystem(){
	//console.clear()
	addLog("run system","basic running process");
	//add vehicle to parking space....
	//check if car arrives
    isArrival = Math.random()<system.profile?true:false
   // console.log("arrival:",isArrival)
    system.capacity=0;
    system.charge_rate=0;
	
    for (i=0;i<system.slots.length;i++){
    	d=system.slots[i];

			if (isArrival && d.available){//if slot available and car arrived
				a= new vehicle(GUID());
		        a.init();
				d.vehicle =a
				d.available=false
				isArrival = false
				system.capacity+=d.vehicle.charge_state;
				continue;}

			else{
				//check if vehicle leaves
				//check if need to charge.
							
				if(d.vehicle!=null){

					if(d.vehicle.user.timeend==system.time){
						d.vehicle=null;
						d.available=true;
						continue;//next slot
						}
					
					if(d.vehicle.netform_factor()<=1){
							 	d.vehicle.charge_state+=d.vehicle.charge_rate; //add to charge
							 	system.charge_rate += d.vehicle.charge_rate; // include in total rate
								d.vehicle.status = "Charging" //change status
						}
						else{
								system.capacity+=d.vehicle.charge_state; //add charge rate to system
								d.vehicle.status="Available"
						}

				}
			}	
		}
    
			//add to vehicle array.
	displaySlots(system.slots)
	if(!system.paused){setTimeout(function(){ system.tick()}, simulation.speed);}
	//if(!system.paused){system.tick()}

	//add to button for now.
}

function tickstep(){system.tick()}

function tickstepcontrol(){
	if (system.paused){
			system.paused=false;system.tick();
			$("#control").text("Pause")
	}
	else {
			system.paused=true;;
			$("#control").text("Run")
	}

}
function netformFactor (){//factor of requirement to charge for bidding system
var nF = 0;
time_to_end = this.user.timeend-system.time;
nF=((this.user.capacity-this.charge_state)*this.charge_rate)/time_to_end;
return (1/nF).toFixed(2)
}


function increment(){
var bidarr=[]
//update netform factor


//run vehicle update loop
//check each vehicle for netformFactor and add to priority array
	arr.forEach(function(veh){
		//console.log(veh.id,veh.netform_factor());
		bidarr.push(veh.netform_factor());
	});
	bidarr.sort(compareNumbers)
	//console.log(bidarr)
}

//if vehicle is leaving then remove from array charging point array.

//

function displaySlots(s){
	//console.log(s)
	$("#sitch").html("updating")
	html=""
	s.forEach(function(d){
		//console.log(d)
		h=""
		//console.log(d.vehicle)
		if(d.vehicle==null){h = "<div class='slot_id'>" + d.id + "</div><div class='status'></div><div class='details'> Empty </div>"}
		else{
			h = "<div class='slot_id'>" +d.id + "</div><div class='details'><div class='status "+  d.vehicle.status +"'></div><span>" + " Charge: " +d.vehicle.charge_state + "|Arrived:" + d.vehicle.user.timestart +     "| Leave:" + (d.vehicle.user.timeend) + "| Time remaining:" + (d.vehicle.user.timeend-system.time) + "| netform:" + d.vehicle.netform_factor() + "<span><span class='nf_user'></span></div>"
		}
		html+= "<div class='slot'>" + h  + "</div>"

	   });
	$("#sitch").html(html)
	$("#charge_rate").text(system.charge_rate);
	$("#capacity").text(system.capacity)
	$("#systemtime").text(system.time)

	system.plot.x.push(system.time)
	system.plot.y.push(system.capacity)

	plot()
}

function compareNumbers(a, b) {
  return a - b;
}

function addLog (i,tx){
	system.log.push({"t":system.time,"item":i,"text":tx})
}

function GUID () { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function plot(){
	var data = [system.plot];
	Plotly.newPlot('plot', data);
}