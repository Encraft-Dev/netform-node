//using sim.js library from http://simjs.com/   **updated version avialble @https://github.com/btelles/simjs-updated


//ADD CHARGE DISCHARGE EVENTS..
//START SIMPLE.. 


console.clear()//lets start with a clean console.
function startsim(t,s,seed){console.log("Starting Simulation");
		$("#controlpanel").hide();
		//netformSimulation(1000,1234,25)
		netformSimulation(t,seed,s)
		}  //using minutes for now
function stopsim(){console.log("Stopping Simulation")}

// var vArr 	  = [{type:"Tesla P85D",MaxCapacity:85,MinCharge:1,C_Rate1:20,D_Rate:10},
// 				{type:"Nissan Leaf",MaxCapacity:35,MinCharge:1,C_Rate1:5,D_Rate:5},
// 				{type:"BMW i8",MaxCapacity:40,MinCharge:1,C_Rate1:10,D_Rate:10},
// 				{type:"Smart 2Four",MaxCapacity:25,MinCharge:1,C_Rate1:2,D_Rate:2}]

var uArr     = [{type:"commute1",duration:240},
		    	{type:"commute2",duration:480},
				{type:"24hrs",duration:1440}]

var cModes =   [{ID:"mode_1_1p",Mode:1,Phase:1,A:16,V:250,Type:"AC",Smart:0,kW:3.84},
				{ID:"mode_1_3p",Mode:1,Phase:3,A:16,V:480,Type:"AC",Smart:0,kW:11.52},
				{ID:"mode_2_1p",Mode:2,Phase:1,A:32,V:250,Type:"AC",Smart:0,kW:7.68},
				{ID:"mode_2_3p",Mode:2,Phase:3,A:32,V:250,Type:"AC",Smart:0,kW:23.04},
				{ID:"mode_3_1p",Mode:3,Phase:1,A:250,V:250,Type:"AC",Smart:1,kW:62.5},
				{ID:"mode_3_3p",Mode:3,Phase:3,A:250,V:480,Type:"AC",Smart:1,kW:180},
				{ID:"mode_4_1p",Mode:4,Phase:1,A:400,V:600,Type:"DC",Smart:1,kW:240},
				{ID:"TSC",mode:"TS",Phase:1,A:250,V:480,Type:"DC",Smart:1,kW:120}]

var vArr = [{Make:"BMW",Model:"i3",Name:"BMW i3",Seats:5,Range:118,MaxCapacity:18.8,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Ford",Model:"Focus EV",Name:"Ford Focus EV",Seats:5,Range:100,MaxCapacity:23,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Mercedes",Model:"B-Class",Name:"Mercedes B-Class",Seats:5,Range:124,MaxCapacity:28,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Nissan",Model:"Leaf (67)",Name:"Nissan Leaf (67)",Seats:5,Range:124,MaxCapacity:24,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"Nissan ",Model:"Leaf (83)",Name:"Nissan  Leaf (83)",Seats:5,Range:155,MaxCapacity:30,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"Renault",Model:"Zoe",Name:"Renault Zoe",Seats:5,Range:100,MaxCapacity:22,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Smart",Model:"ForTwo",Name:"Smart ForTwo",Seats:2,Range:84,MaxCapacity:17,MinCharge:3,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Citroen",Model:"C-Zero",Name:"Citroen C-Zero",Seats:4,Range:93,MaxCapacity:16,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"Mitsubishi",Model:"I-Miev",Name:"Mitsubishi I-Miev",Seats:4,Range:93,MaxCapacity:16,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"VW",Model:"E-up",Name:"VW E-up",Seats:4,Range:93,MaxCapacity:18,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:1,C_TS:0},
			{Make:"VW",Model:"E-golf",Name:"VW E-golf",Seats:5,Range:118,MaxCapacity:24,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:1,C_TS:0},
			{Make:"Peugeot",Model:"iON",Name:"Peugeot iON",Seats:4,Range:93,MaxCapacity:16,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"Tesla",Model:"Model S (60)",Name:"Tesla Model S (60)",Seats:5,Range:240,MaxCapacity:60,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:1},
			{Make:"Tesla",Model:"Model S (85D)",Name:"Tesla Model S (85D)",Seats:5,Range:310,MaxCapacity:85,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:1},
			{Make:"Tesla",Model:"Model S (90D)",Name:"Tesla Model S (90D)",Seats:5,Range:340,MaxCapacity:90,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:1},
			{Make:"Tesla",Model:"Model X (208)",Name:"Tesla Model X (208)",Seats:7,Range:259,MaxCapacity:75,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:1},
			{Make:"Tesla",Model:"Model X (250)",Name:"Tesla Model X (250)",Seats:7,Range:303,MaxCapacity:90,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:1},
			{Make:"Kia",Model:"Soul EV",Name:"Kia Soul EV",Seats:5,Range:132,MaxCapacity:30.5,MinCharge:1,C_Rate1:11.52,C_Rate2:3.84,D_Rate:11.52,C_RUT:5,C_RDC:0.8,C_T1:1,C_T2:0,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"BYD",Model:"e6",Name:"BYD e6",Seats:5,Range:186,MaxCapacity:61.4,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0},
			{Make:"Mahindra",Model:"e2o",Name:"Mahindra e2o",Seats:4,Range:79,MaxCapacity:15.5,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:1,C_CS:0,C_TS:0},
			{Make:"Renault",Model:"Zoe ZE",Name:"Renault Zoe ZE",Seats:5,Range:170,MaxCapacity:40,MinCharge:1,C_Rate1:23.04,C_Rate2:7.68,D_Rate:23.04,C_RUT:5,C_RDC:0.8,C_T1:0,C_T2:1,C_T3:0,C_T4:0,C_CS:0,C_TS:0}]

var  Cp = {"0":0.2,"1":0.2,"2":0.2,"3":0.2,"4":0.2,"5":0.2,"6":0.2,"7":0.2,"8":0.2,"9":0.25,"10":0.25,"11":0.25,"12":0.3,"13":0.3,"14":0.35,"15":0.5,"16":0.55,"17":0.6,"18":0.65,"19":0.7,"20":0.75,"21":0.8,"22":0.83,"23":0.85,"24":0.9,"25":0.95,"26":1,"27":1,"28":1,"29":1,"30":1,"31":0.98,"32":0.95,"33":0.92,"34":0.9,"35":0.85,"36":0.8,"37":0.7,"38":0.65,"39":0.55,"40":0.45,"41":0.4,"42":0.35,"43":0.3,"44":0.25,"45":0.2,"46":0.2,"47":0.2}

// Type 1 J1772	
// Type 2 Mennekes	
// Type 3 Scame
// Type 4 CHADemO
// CCS	Combined charger system
// TS	tesla supercharger


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
		//netformFactor:0
		netFF:0,//set using netformfactor function
		arrival:0,
		onSlotTime:0,
		departure:0,
		departureTime:0,
		facilitySlot:0,
		command:0, //default is charge //will need to object at some point to enable fast,slow chage and discharge/ currently is  
		charge:function(){
			//console.log(this.id,this)
			//todo - deal with charge rates, netform factor etc....
			//todo - add discharge requirement function
			//
			switch(this.statusCode){
				case 1: //on charge point
						this.netformFactor();
						//this.rate=0;//add default to do nothing...
						//this.chargeStatus=0;//default
						if(this.current >this.model.MaxCapacity){
							this.current = this.model.MaxCapacity;
							this.rate=0;//add default to do nothing...
							this.chargeStatus=0;//default
						}

						if(this.current < this.model.MinCharge){
							this.current = this.model.MinCharge;
							this.rate=0;//add default to do nothing...
							this.chargeStatus=0;//default
						}

						// if netform factor requires then charge me.
						if (this.netFF>=1){this.command=1;this.chargeStatus=1}

						if (this.model.MinCharge <= this.current && this.current <= this.model.MaxCapacity){// if able to charge/discharge.
							this.chargeStatus = this.command;//accept request // following  if statements  qualify
							switch (this.chargeStatus){
								case 1: //charge
									this.rate=this.model.C_Rate1;
								break;
								case -1: //discharge
									this.rate=this.model.D_Rate;
								break;
								case 0: //hold
									this.rate=0;
								break;
								default:
							}
						//check if fully charged// dont charge // discharge should be available
						};

						this.current = this.current + (this.chargeStatus * (this.rate/60));


						// if(this.current >this.model.MaxCapacity){
						// 	this.current = this.model.MaxCapacity;
						// 	this.rate=0;//add default to do nothing...
						// 	this.chargeStatus=0;//default
						// }

						// if(this.current < this.model.MinCharge){
						// 	this.current = this.model.MinCharge;
						// 	this.rate=0;//add default to do nothing...
						// 	this.chargeStatus=0;//default
						//}
				break;
				default:
				}
			},
		netformFactor:function(){
				 time_to_depart = this.onSlotTime+this.user.duration-sim.time(); //this.arrival+this.user.duration-sim.time();//user.timeend-system.time;
				 remaining_charge = this.model.MaxCapacity-this.current
				 time_to_full=remaining_charge/(this.model.C_Rate1/60)
			     nff= (time_to_full/time_to_depart).toFixed(3)
				 this.netFF = nff  //time_to_end //nF //(1/nF).toFixed(2)
				 return true;
			},
		selfCharge:function(){//if not given any commands then charge if netform requires.
					//this should override any message commands..
					this.netformFactor();
					if(this.netFF>=1){
							this.command=1;
						if(this.current >this.model.MaxCapacity){
							this.current = this.model.MaxCapacity;
						}

						if(this.current < this.model.MinCharge){
							this.current = this.model.MinCharge;
						}
							this.charge();
						}
					// this.setTimer(1).done(this.selfCharge)//loop control
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
		        this.setTimer(0.1).done(this.selfCharge())//loop control

		        //figure out time and cp cap...
		        
				x =(Cp[Math.floor(sim.time()/30)]*SLOTS)/30//  here isqwi?&&*******
****************
		        this.setTimer( random.normal(x,2)).done(function(){//set time to next vehicle...can be more complex
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
		    			 if(this.statusCode==1){this.onSlotTime=sim.time()}
	    			break;
	    			case 1:
	    				this.statusText="on point";
	    			break;
	    		}
	    },
	    onMessage:function(s,m){
	    		this.checkQueue()
	    		if(Park.inQueue(this.id)){this.status="Awaiting charge point"}
	    		switch (m){
	    			case "status":

	    				st = (100*this.current/this.model.MaxCapacity).toFixed(0)
	    				this.send([this.statusCode,
	    						   this.rate.toFixed(0),
	    						   st,
	    						   this.netFF,
	    						   this.chargeStatus,
	    						   this.model,
	    						   this.user,
	    						   this.arrival,
	    						   this.departureTime],
	    						   0,
	    						   s);
	    			break;
	    			case "charge":
	    				this.command=1;this.charge();
	    			break;
	    			case "discharge":
	    			//check for nff here??
	    			//if(this.netFF<1){
	    				this.command=-1;this.charge();
	    			//}
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
 							this.setTimer(1).done(function(){this.sendTick()})
 						},
 		askStatus:function(){
 							system.log.push([this.vehStatus,Park.caps()])	
 			               	this.vehStatus=[];
 							this.send("status",0);
 							this.setTimer(1).done(function(){
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
 		     
 			if (sim.time()>100 && sim.time()<200){
 				this.send("discharge",0)
 				}
 			else {this.send("hold",0)}
 			this.setTimer(1).done(function(){this.discharge()})
 			//if export cap then ask for each avialable then  share between 

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
	system.simtime=SIMTIME
	$("#controlpanel").show()
	//stats_vehicles.finalize(sim.time())
	//visualise(log);
	//console.log(stats_vehicles.getHistogram())      // start simulation
   // Park.report();  
}

// output functions (todo move to separate file)

var system = {
	paused:true,
	simtime:0,
	time:-1,
	log:[],
	plot1:{name:"Max Capacity (kWh)",x:[],y:[],type:"scatter"},
	plot2:{name:"Available Capacity (kWh)",x:[],y:[],type:"scatter"},
	plot3:{name:"Import/Export (kW)",x:[],y:[],type:"scatter"},
	plot4:{name:"",x:[],y:[],type:"scatter"},
	run:function(){runsystem(system.time)},
	tick:function(){this.time++;this.run() }
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
	document.title = 'Netform' + "  |" + system.time + "/" + system.simtime ;
	visualise(system.log[stime],stime)
	//console.log(system.log[stime])
	if(!system.paused){if(stime<system.simtime){
						setTimeout(function(){ 
							system.tick()}, $("#timestep").val())};
					 }
}


function visualise(arr,systemtime){
	out="";
	on="";
	qu="";
	ex="";
	ie=0;
	n=0;q=0;
	//console.log(arr)
	dArr=arr[0]
	for (i=dArr.length-1;i>=0;i--){
		
			state="On charger"
			if(dArr[i].message[0]<0){state="Exited"}
			if(dArr[i].message[0]==0){state="In Queue"}
			colour="#333";
			if(dArr[i].message[1]*dArr[i].message[4]<0){colour="red";}
			if(dArr[i].message[1]*dArr[i].message[4]>0){colour="green";}
		
			battmaxcap = dArr[i].message[5].MaxCapacity
		//console.log(arr)
			o=""
			o+="<div class='veh'><div class='veh_id'>" + dArr[i].s +  "</div>";
			o+="<div class='veh_status'>" + dArr[i].message[5].Name + "</div>";
			o+="<div class='veh_status'>" + state + "</div>";
			//if(state!="Exited"){
			o+="<div class='veh_maxcap'><div class='status_vis' style='width:"+battmaxcap+"%'><div class='veh_state_vis' style='background-color:"+colour+";width:"+dArr[i].message[2]+"%'></div></div></div>"
			o+="<div class='veh_state'>"+dArr[i].message[1]+" kW |" + dArr[i].message[3] + "|" + dArr[i].message[4] + "</div>"
			//}
			o+="</div>"
			
			out+=o

			if(state=="On charger"){on+=o;n+=1}
			if(state=="In Queue"){qu+=o;n+=1}	
			if(state=="Exited"){ex+=o}
			
			ie+=dArr[i].message[1]*dArr[i].message[4]

			//add rate * chargestatus to bin for import export


	}
	//current
	system.plot1.x.push(systemtime)
	system.plot1.y.push(arr[1][1])
	//total capacity
	system.plot2.x.push(systemtime)
	system.plot2.y.push(arr[1][0])

	system.plot3.x.push(systemtime)
	system.plot3.y.push(ie)
	
	$("#list").html(on)
	$("#queue").html(qu)
	$("#exit").html(ex)

   plot();


}

function plot(){
	var data = [system.plot1,system.plot2,system.plot3];
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