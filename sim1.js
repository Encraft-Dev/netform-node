//using sim.js library from http://simjs.com/   **updated version avialble @https://github.com/btelles/simjs-updated

function startsim(){console.log("Starting Simulation")
		netformSimulation(1000,1234,10)
		}  //using minutes for now
function stopsim(){console.log("Stopping Simulation")}

var vArr = [{type:"Tesla P85D",MaxCapacity:85,MinCharge:1,cRate:20},
			{type:"Nissan Leaf",MaxCapacity:35,MinCharge:1,cRate:5},
			{type:"BMW i8",MaxCapacity:40,MinCharge:1,cRate:10},
			{type:"Smart 2Four",MaxCapacity:25,MinCharge:1,cRate:2}]

var uArr = [{type:"commute1",duration:240},
			{type:"commute2",duration:480},
			{type:"24hrs",duration:1440}]

var Slot = {//definition of charging slot
		type:0,
		ttl:1,
		vehId:0
	}
	

function netformSimulation(SIMTIME,SEED,SLOTS){
	//set simulation parameters
	var sim = new Sim("Netform");
	var random = new Random(SEED);
	var stats = new Sim.Population("cars");
	//make events
	//external events
	//demand for FFR, store, import, export
	//arrival of vehicles... trains,  airplanes.

	//add capacity check event

	var Park = new Sim.Facility("park", Sim.Facility.FCFS,SLOTS)//this manages timing and queuing
	Park.report = function(){console.log(this)};
	Park.status = function(){return this.freeServers}
	Park.inQueue = function(id){
			q=false;
			t=this.queue.data;
			for (i=0;i<t.length;i++){
					q = t[i].entity.id==id?t[i].entity.id:false;
				}
			return q;
	}

	var Store = new Sim.Store("slots",SLOTS) // this manages cars and slots by id.
	var Total = new Sim.Buffer("total capacity",10000)
	var capacity = new Sim.Event("check available capacity")
	var vehicleGo = new Sim.Event("Vehicle Go")
	var facililyFree = new Sim.Event("Slot available")
	//var energy =[new Sim.event("charging"),new Sim.event("discharging")]

	//create slot array. this allows specific slots to have specific chargers...


	var Vehicle = {
		status:"Awaiting charge point",
		log:[],
		model:"",	
		user:"",
		current:0,
		rate:0,//negative for discharge/positive for charge
		netformFactor:0,
		arrival:0,
		departure:0,
		facilitySlot:0,
		atFacility:true,
		command:0,  //will need to object at some point to enable fast,slow chage and discharg
		available:function(){var a = false;if(this.atFacility==true && Park.inQueue(this.id)==false){a=true};return a},
		charge:function(){ 
			//todo - deal with charge rates, netform factor etc....
			//todo - add discharge requirement function
			this.status = "On Charge Point";
			this.rate=0;
				if (this.model.MinCharge < this.current && this.current < this.model.MaxCapacity){
					this.status = "Charging";//TODO add others eg discharge and rate.
					this.rate=this.model.cRate;
					this.current += this.command * (this.model.cRate/60);
				}
				
				if(this.current + this.model.cRate >=this.model.MaxCapacity){
					this.current = this.model.MaxCapacity;
					this.status="Fully charged";
					this.rate=0;
				}
			},
		netformFactor:function(){
				 time_to_depart = this.departure-sim.time();//user.timeend-system.time;
				 remaining_charge = this.model.MaxCapacity-this.current
				// nF=((this.model.MaxCapacity-this.current)* this.user.cRate)/time_to_depart;
				 return ((remaining_charge / (this.model.cRate/60))/time_to_depart).toFixed(1)  //time_to_end //nF //(1/nF).toFixed(2)
			},
		leavefacility:function(){
				this.atFacility=false;
				this.status="Exited";
        		this.departure = sim.time();//this.arrival + this.user.duration;
        		this.facilitySlot =0;
        		},
	    start: function () {
		    	//get vehicle type,set user and current state of charge
		    	this.model=vArr[(random.random()*(vArr.length-1)).toFixed(0)];
		    	this.user=uArr[(random.random()*(uArr.length-1)).toFixed(0)];
	 			this.current=random.uniform(1, this.model.MaxCapacity);//current battery charge
		        
		        var useDuration = this.user.duration//TODO - add normal around this number
		     	//arrive
		        this.arrival=sim.time();
		        this.useFacility(Park, useDuration)//facility manages time and departure
		        	.done(this.leavefacility)
		        	.setData(this.id);
		        //set next
		        this.setTimer( random.normal(10,5)).done(function(){//set time to next vehicle...can be more complex
		        			sim.addEntity(Vehicle); 	
		        	});
		       
		        //set my control
		        this.setTimer(5).done(function(){//left to own devices, vehicle will attempt to charge.
		        	if(this.available()){//if i am on a charge point
		        			this.charge()
		        		}
		        	});
		        //this.setTime(1).done(function(){logMystats()})

	   
	    	},
	    onMessage:function(s,m){
	    		switch (m){
	    			case "status":
	    				this.send([this.status,this.rate],0,s);
	    				
	    			break;
	    			default:	
	    		}
	    	},

	    finalize:function(){},
	}


//controller - starts,stops and provided global functions for the sim
 	var Controller = {
 		vehStatus:[],
 		sendTick:function(){
 							this.send("tick",0);
 							this.setTimer(1).done(function(){this.sendTick()})
 						},
 		askStatus:function(){ 
 							this.send("status",0);
 							this.setTimer(1).done(function(){
 							//	console.log("status:",this.vehStatus)
								showVehicleList(this.vehStatus);
 								this.vehStatus=[];
 								this.askStatus()})
 						},
 		start:function(){
 						console.log("controller started");
 							this.askStatus();
 							this.sendTick();
 						},
 		onMessage:function(sender,message){
 			s = sender.id;
 			this.vehStatus.push({s,message})
 			//on 
 			//console.log(sender.id,message);
 			//document.getElementById("log").innerHTML += "<pre>"+message.entityId+"</pre>";
 		},
 	}

	
	sim.addEntity(Controller)
	sim.addEntity(Vehicle);   
	
	sim.simulate(SIMTIME);
	console.log("Simulation End")       // start simulation
    Park.report();  
}



function showVehicleList(list){
	out=""
	// sort by value
	list.sort(function (a, b) {
	  return a.s - b.s;
	});
	list.sort()
	for (i=0;i<list.length;i++){
		out+="<div class='veh'>" + list[i].s + ":" + list[i].message[0] + "</div>"
	}
	$("#list").html(out);
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