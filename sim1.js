//using sim.js library from http://simjs.com/   **updated version avialble @https://github.com/btelles/simjs-updated


//todo ADD LOGGING AND OUTPUT SCEEN
//ADD CHARGE DISCHARGE EVENTS..
//START SIMPLE.. 
//a. single requirement for discharge for 30 mins. randomly.
//


//system controllers for visuallisation and switching
//
var system = {
	paused:true,
	time:-1,
	log:[],
	plot1:{x:[],y:[],type:"scatter"},
	plot2:{x:[],y:[],type:"scatter"},
	run:function(){runsystem(system.time)},
	tick:function(){this.time++;this.run() }
}


console.clear()
function startsim(t,s,seed){console.log("Starting Simulation");
		$("#controlpanel").hide();
		//netformSimulation(1000,1234,25)
		netformSimulation(t,seed,s)
		}  //using minutes for now
function stopsim(){console.log("Stopping Simulation")}

var vArr = [{type:"Tesla P85D",MaxCapacity:85,MinCharge:1,cRate:20,dRate:10},
			{type:"Nissan Leaf",MaxCapacity:35,MinCharge:1,cRate:5,dRate:5},
			{type:"BMW i8",MaxCapacity:40,MinCharge:1,cRate:10,dRate:10},
			{type:"Smart 2Four",MaxCapacity:25,MinCharge:1,cRate:2,dRate:2}]

var uArr = [{type:"commute1",duration:240},
			{type:"commute2",duration:480},
			{type:"24hrs",duration:1440}]

// var Slot = {//definition of charging slot
// 		type:0,
// 		ttl:1,
// 		vehId:0
// 	}

function netformSimulation(SIMTIME,SEED,SLOTS){
	//set simulation parameters
	var sim = new Sim("Netform");
	var random = new Random(SEED);
	var number_of_vehicles=0
	//make events
	//external events
	//demand for FFR, store, import, export
	//arrival of vehicles... trains,  airplanes.

	//add capacity check event

	// add logging array
	// 
	

	var Park = new Sim.Facility("park", Sim.Facility.FCFS,SLOTS)//this manages timing and queuing
	Park.report = function(){console.log(this)};
	Park.caps = function(){
		
		  st = sim.entities
		  ca = 0;
		  cu = 0;
		  if (st.length>1){
				for (i=1;i<st.length;i++){
					if(st[i].statusCode == 1){
						cu+=st[i].current
						ca+=st[i].model.MaxCapacity
					}				
			}

		  }
		return [cu,ca];
	};
	Park.status = function(){return this.freeServers}
	Park.inQueue = function(id){
			q=1;
			t=this.queue.data;
			for (i=0;i<t.length;i++){
					if(t[i].entity.id===id){q=0}
				}
			//console.log(id,q,sim.time(),this.queue.data)
			return q;
	}


	//var SlotStore = new Sim.Store("slots",SLOTS) // this manages cars and slots by id.
	//var exitVehiclesStore = new Sim.Store("exited vehicles",100)

	//var dischargeEvent = new Sim.Event("discharging")
	//var Capacity = new Sim.Buffer("total capacity",10000)
	
	//var vehicleGo = new Sim.Event("Vehicle Go")
	//var facililyFree = new Sim.Event("Slot available")
	//var energy =[new Sim.event("charging"),new Sim.event("discharging")]

	//create slot array. this allows specific slots to have specific chargers...
	var Slot= {
		type:"Standard",
		modes:[3,7,22]
	}

	var Vehicle = {
		statustext:"Awaiting charge point",
		statusCode:0,// 0 - in queue, 1-on charge point , -1 - exited
		chargeStatus:0, // 0 = not charging  // 1 = mode 1 charging   2= mode 2 charging // -1 mode 1 discharging  // -2 mode 2 discharging
		state:"",
		log:[],
		model:"",
		user:"",
		current:0,
		rate:0,//negative for discharge/positive for charge
		//netformFactor:0,
		arrival:0,
		departure:0,
		facilitySlot:0,
		command:0,  //will need to object at some point to enable fast,slow chage and discharge/ currently is  
		charge:function(){
			//console.log(this.id,this)
			//todo - deal with charge rates, netform factor etc....
			//todo - add discharge requirement function
			//
			//
			switch(this.statusCode){
				case 1: //on charge point

						this.rate=0;//add default to do nothing...
						this.chargeStatus=0;//default

						if (this.model.MinCharge < this.current && this.current < this.model.MaxCapacity){// if able to charge/discharge.
							this.chargeStatus = this.command;//accept request // following  if statements  qualify
							switch (this.chargeStatus){
								case 1: //charge
									this.rate=this.model.cRate;
								break;
								case -1: //discharge
									this.rate=this.model.dRate;
								break;
								case 0: //hold
									this.rate=0;
								break;
								default:
							}
						//check if fully charged// dont charge // discharge should be available
						if(this.current + this.model.cRate/60 >=this.model.MaxCapacity){
							this.current = this.model.MaxCapacity;
							if (this.chargeStatus==1){this.chargeStatus=0;this.rate=0}
						}
						// if netform factor requires then charge me.
						if (this.netformFactor()>=1){this.chargeStatus=1; this.rate=this.model.cRate}

						this.current = this.current + (this.chargeStatus * (this.rate/60));
						}

				break;
				default:
				}
			},
		netformFactor:function(){
			
				 time_to_depart = this.arrival+this.user.duration-sim.time();//user.timeend-system.time;
				 remaining_charge = this.model.MaxCapacity-this.current
				 time_to_full=remaining_charge/(this.model.cRate/60)

				// nF=((this.model.MaxCapacity-this.current)* this.user.cRate)/time_to_depart;
			     nff= (time_to_full/time_to_depart).toFixed(4)

				 return nff  //time_to_end //nF //(1/nF).toFixed(2)
			},
		selfCharge:function(){//if not given any commands then charge if netform requires.
					//this should override any message commands..
					if(this.netformFactor()>=1){
							this.command=1;
							this.charge()
						}

					this.setTimer(1).done(this.selfCharge)

		},
		leavefacility:function(){
			
        		this.departure = sim.time();//this.arrival + this.user.duration;
        		this.facilitySlot = 0;
        		this.statusCode = -1;
        		this.statusText="Exited";
        		this.chargeStatus=0;

        		},
	    start: function () {
	    		
	    	    //number_of_vehicles++
	    		//stats_vehicles.record(number_of_vehicles,sim.time());
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
		        this.checkQueue();
		        this.selfCharge();
		        this.setTimer( random.normal(10,5)).done(function(){//set time to next vehicle...can be more complex
		        			sim.addEntity(Vehicle); 	
		        	});
	    		},
	    checkQueue:function(){//while in queue check and set inque = false once entered facility
	    		//console.log(sim.time(),this.id,Park.inQueue(this.id))
	    		switch(this.statusCode){
	    			case -1:
	    				this.statusText="Gone baby gone"
	    				this.statusCode=-1;
	    			break;
	    			case 0:
		    			this.status="Awaiting charge point!"
		    			this.statusCode=0;
		    			this.statusCode=Park.inQueue(this.id);
	    			break;
	    			case 1:
	    				this.statusText="on point";
	    				
	    			break;
	    		}

	    	// 	if(this.statusCode==0){
	    	// 		this.status="Awaiting charge point!"
	    	// 		this.statusCode=0;
	    	// 		this.statusCode=Park.inQueue(this.id);
	    	// 		}
	    	// 	else {
	 				// this.statusText="on point"
	    	// 		this.statusCode=1;
	    	// 	}
	    },
	    onMessage:function(s,m){
	    		this.checkQueue()
	    		if(Park.inQueue(this.id)){this.status="Awaiting charge point"}
	    		switch (m){
	    			case "status":
	    				this.send([this.statusCode,this.rate.toFixed(0),(100*this.current/this.model.MaxCapacity).toFixed(0),this.netformFactor(),this.chargeStatus],0,s);
	    			break;
	    			case "charge":
	    				this.command=1;this.charge();
	    			break;
	    			case "discharge":
	    			this.command=-1;this.charge();
	    			break;
	    				case "hold":
	    				this.command=0;this.charge();
	    			break;
	    			default:	
	    		}
	    	},

	    finalize:function(){},
	}


//controller - starts,stops and provided global functions for the sim
 	var Controller = {
 		log:[],
 		vehStatus:[],
 		sendTick:function(){
 							
 							//stats_veh2.record(Park.systemStats().population,sim.time())
 							this.send("tick",0);

 							this.setTimer(1).done(function(){this.sendTick()})
 						},
 		askStatus:function(){
 			               	
 							this.send("status",0);
 							this.setTimer(1).done(function(){
 								
 								//	console.log("status:",this.vehStatus)
 								//	add to final log array....
								//showVehicleList(this.vehStatus);//show on screen
								system.log.push([this.vehStatus,Park.caps()])
								this.vehStatus=[];
							//console.log(SlotStore)
							this.askStatus()
							})
 						},
 		askCommand:function(){this.send("charge",0);},

 		start:function(){
 						//console.log("controller started");
 							this.askStatus();
 							this.discharge();
 							//this.askCommand();
 							//fire random events fro discharging and charging...... including how long for...
 							//this.sendTick();
 							
 						},
 		discharge:function(){
 		       this.setTimer(1).done(this.discharge)
 			if (sim.time()>100 && sim.time()<200){
 				this.send("discharge",0)
 				}
 			else {this.send("hold",0)}	
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
	console.log("Simulation End")
	//console.log(sim)
	$("#controlpanel").show()
	//stats_vehicles.finalize(sim.time())
	//visualise(log);
	//console.log(stats_vehicles.getHistogram())      // start simulation
   // Park.report();  
}

//output functions

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


function runsystem(stime){
	//console.log("runsystem:",stime)
	$("#systemtime").html(system.time);
	visualise(system.log[stime],stime)
	//console.log(system.log[stime])
	if(!system.paused){setTimeout(function(){ system.tick()}, $("#timestep").val());}
}


function visualise(arr,systemtime){
	out="";
	on="";
	qu="";
	ex="";
	n=0;q=0;
	//console.log(arr)
	dArr=arr[0]
	for (i=dArr.length-1;i>=0;i--){
		
			state="On charger"
			if(dArr[i].message[0]<0){state="Exited"}
			if(dArr[i].message[0]==0){state="In Queue"}
			colour="#333";
			if(dArr[i].message[1]<0){colour="red";}
			if(dArr[i].message[1]>0){colour="green";}
		
		//console.log(arr)
			o=""
			o+="<div class='veh'><div class='veh_id'>" + dArr[i].s + "</div>";
			o+="<div class='veh_status'>" + state + "</div>";
			if(state!="Exited"){
				o+="<div class='status_vis'><div class='veh_state_vis' style='background-color:"+colour+";width:"+dArr[i].message[2]+"%'></div></div>"
			o+="<div class='veh_state'>"+dArr[i].message[1]+" kW </div>"
			}
			o+="</div>"
			
			out+=o

			if(state=="On charger"){on+=o;n+=1}
			if(state=="In Queue"){qu+=o;n+=1}	
			if(state=="Exited"){ex+=o}
			

	}
	//current
	system.plot1.x.push(systemtime)
	system.plot1.y.push(arr[1][0])
	//total capacity
	system.plot2.x.push(systemtime)
	system.plot2.y.push(arr[1][1])
	
	$("#list").html(on)
	$("#queue").html(qu)
	$("#exit").html(ex)

   plot();


}

function plot(){
	var data = [system.plot1,system.plot2];
	Plotly.newPlot('plot', data);
}

function tickstep(){system.tick()}

function tickstepcontrol(){
	if (system.paused){
			system.paused=false;
			system.tick();
			$("#control").text("Pause")
	}
	else {
			system.paused=true;;
			$("#control").text("Run")
	}

}


//common
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