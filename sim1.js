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

var uArr     = [{type:"commute1",duration:240,cap_pref:0.8,cap_min:0.6},
		    	{type:"commute2",duration:480,cap_pref:0.8,cap_min:0.6},
				{type:"24hrs",duration:1440,cap_pref:0.8,cap_min:0.6}]

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

var veh_maxchargerate = 0
for(i=0;i<vArr.length;i++){
	veh_maxchargerate = vArr[i].C_Rate1 > veh_maxchargerate ? vArr[i].C_Rate1 : veh_maxchargerate;
}


var  Cp = {"0":0.1,"1":0.15,"2":0.15,"3":0.2,"4":0.2,"5":0.2,"6":0.2,"7":0.2,"8":0.2,"9":0.25,"10":0.25,"11":0.25,"12":0.3,"13":0.3,"14":0.35,"15":0.5,"16":0.55,"17":0.6,"18":0.65,"19":0.7,"20":0.75,"21":0.8,"22":0.83,"23":0.85,"24":0.9,"25":0.95,"26":1,"27":1,"28":1,"29":1,"30":1,"31":0.98,"32":0.95,"33":0.92,"34":0.9,"35":0.85,"36":0.8,"37":0.7,"38":0.65,"39":0.55,"40":0.45,"41":0.4,"42":0.35,"43":0.3,"44":0.25,"45":0.2,"46":0.2,"47":0.2}

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
		return {currentCap:cu,maximumCap:ca};
	};
	Park.status = function(){
			f=  this.free //number of aviable slots
			q=  this.queue.data.length//population in queue
			ps= this.stats.population - q;
			pq=q;
			t=this.total
			pe=t-this.stats.population;
			// s=sim.entities

			return {SlotsFree:f,onSlot:ps,Queue:pq,Exited:pe,Total:t}
	}
	Park.total= 0;
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
		chargeStart:0,// time from start charging (for ramp up time)
		netformStatus:0,//0=not affect, number = modulation
		netformModulation:1,
		prediction:{},//provides netform control for modulating rate/discharge...
		state:"",
		NF_vehStatus:[],
		Constraints:[],
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
		charge:function(live){//live uses NF modulator, and updates this..  --- not live updates predition object..
			//if(this.id==2){console.log(live,sim.time(),this.current,this.prediction)}
			switch(this.statusCode){

				case 1: //on charge point
						//capture current conditions for prediction run/
						rate=this.rate
						current=this.current
						chargeStatus=this.chargeStatus
						chargeStart=this.chargeStart

					
						//run negotiation to set modulator....
						//
						//
						//this.netformModulation = this.negotiation()
						
						//add ramp up time (use rd???)
						chargeStatus=this.command //default to request

						
						// if netform factor requires then charge me.
						if (this.netformFactor()>1){chargeStatus=1}//fire netform....
						if((current/this.model.MaxCapacity)>this.model.C_RDC && chargeStatus>0){chargeStatus=2}//slow drop towards top.
						if(chargeStatus==0 && system.control.slow_charge){chargeStatus=2}


						//do negotiation here...
						//
						neg=this.negotiation(chargeStatus,rate)
						chargeStatus=live?neg.status:chargeStatus;
						netformModulation=live?neg.rate:1;
						if (this.model.MinCharge <= current && current <= this.model.MaxCapacity){// if able to charge/discharge.
						//	this.chargeStatus = this.command;//accept request // following  if statements  qualify
							//rd=1//rate direction + charging - discharging and ramp time
							switch (chargeStatus){
								case 2:
									rate=netformModulation*this.model.C_Rate2;
									chargeStart++;
									if(chargeStart<this.model.C_RUT){
										rate=rate*chargeStart/this.model.C_RUT
									//	if(this.id==2){console.log(rate)}
									}
								break;
								case 1: //charge
									rate=netformModulation*this.model.C_Rate1;
									chargeStart++;
									if(chargeStart<this.model.C_RUT){
										rate=rate*chargeStart/this.model.C_RUT
									}
								break;
								case -1: //discharge at default
									rate=(netformModulation*-1*this.model.D_Rate);
									chargeStart=0
								break;
								case 0: //hold
									rate=0;
									chargeStart=0
								break;
								default:
							}
						};

						//l=live?this.negotiation():false

						//modulation_rate=live?this.netformModulation:1; //set the factor is live run, use 1 if prediction run.

						//rate=modulation_rate*rate
						//chargeStatus=modulation_status

						//if(this.id==2){console.log(sim.time(),live,this.current,rate,modulation_rate,chargeStatus,this.netformFactor())}

							current +=  rate/60;
						
						if(current > this.model.MaxCapacity && rate>0){
							current = this.model.MaxCapacity;
							rate=0;//add default to do nothing...
							chargeStatus=0;//default
							}

						if(current < this.model.MinCharge && rate<0){
							current = this.model.MinCharge;
							rate=0;//add default to do nothing...
							chargeStatus=0;//default
							}

						//if not prediction
						if(live){
							this.rate=rate
							this.current=current
							this.chargeStatus=chargeStatus
							this.chargeStart=chargeStart
							return true;
						}
						else
						{
							this.prediction = {
								rate:rate,
								current:current,
								chargeStatus:chargeStatus,
								chargeStart:chargeStart,
								netform:this.netFF
							}
						return false;
						}
						
						//console.log(sim.time(),this.id,this.NF_vehStatus)
						// //*******************************
						// neg=this.negotiation()
						// this.rate=neg.rate;
						// this.chargeStatus=neg.chargeStatus
						// //this is the good stuff
						// //*********************************
						// //
				break;
				default:
				}
			},
		negotiation:function(cStatus,cRate){
			v=this.NF_vehStatus
			//if(this.id==4){console.log(v)}
			//oRate=this.rate;
			//oCS=this.chargeStatus;
			this.netformStatus=cStatus;//pass through from calc by default
			this.netformModulation=1;
			aRate=0;  //message.
			nfRate=0;
			rate=0;
			nfList=[]
			list=[];
			nfMod=1;//modulate rate.... nf
			nfStatus=this.netformStatus
			//Mod=1;//modulate rate other
			//if(this.id==4){sim.time(),console.log(v)}
			//set up data streams
			for(i=0;i<v.length;i++){
				if(v[i].message.statusCode==1){

					//this.id==2?console.log(sim.time(),v[i]):false
					x=v[i].message.prediction;
					//rd=(x.chargeStatus>=0?1:-1)
					aRate += (1*x.rate);//get max rate..
					if(x.netform>=1){//add netform >1 to arr
						nfList.push(x);
						nfRate+=(1*x.rate)}
					else{
						list.push(x);
						rate+=(1*x.rate)};
					}
				
			}
			//check against capacity (import)
			//if(this.Constraints[0])
			//
			//
			//
			//
			//Cap scenario
			//1. NF is below; others are above>>modulate others
			//2. NF is above;>>switch off others; modulate NF (based on weighting??) 
			//3. NF is above >> discharge others to meet demand...
			//4. NF is above >> modulate NF based on NF size....
			//
			//demand scenario
			//1.discharge of xxx for x mins
			//2.charge of xxx for x mins

			importcap=this.Constraints.importCap;
			exportcap=this.Constraints.exportCap;
			//Capacity scenarios
			if(this.Constraints && aRate>=importcap){
				
				nonNFModRate = (importcap-nfRate)/rate;  // first modulate non nf leaving nf
				//NFmodRate=1;
				
				nfMod = nonNFModRate>1?1:nonNFModRate; //non constraints // this should never happen here.....
				nfMod = this.netFF>1?1:nfMod
			
				if (nonNFModRate<0){
					if(this.netFF>1){
						
							nfMod=importcap/nfRate; //should be weighted by netform
						}else{
							nfMod=0;nfStatus=0}
				}
				
				//
				//(tMod<0 && this.netFF>1)? nfMod  :nfMod

				//nfMod==0?nfStatus=0:false;



				//nfMod = nfMod<0?
				//scenario 1:NF + mod other....
				// if(nfRate<this.Constraints.importCap && this.netFF<1){//modulate none NF
				// 	nfMod = aRate>0 ? (this.Constraints.importCap-nfRate)/rate : nfMod
				// }
				//scenario 2:
		
				//if(nfRate>=this.Constraints.importCap && this.netFF<1){//hold none NF
				//	nfStatus=0;
				//}

				//if(nfRate>=this.Constraints.importCap && this.netFF>=1){//Modulate NF
			//		//this.id==2?console.log(sim.time(),aRate,nfRate,nfMod):false
					//nfMod=aRate>0?(nfRate-this.Constraints.importCap)/nfRate:nfMod
			//	}
				//if not netform then switch off nonNF
				
				//if cap is too low for netforms then switch off all, 

				//if netforms cant charge then modulate netforms/discharge others.  - this is where the negiation may come in....

		
			//if(this.id==4){console.log(this.netformModulation)}	
			//this.netformStatus=0//this.netFF<0?0:cStatus
			}

			if(this.Constraints && aRate<=this.Constraints.exportCap ){
						
						
					}

			this.netformModulation=nfMod
			this.netformStatus=nfStatus
			//this.netformStatus=this.chargeStatus
			
		//this.id==2?
		return{rate:this.netformModulation,status:this.netformStatus}
			//if(this.id==4){console.log(nfList,nfRate,list,rate,aRate)}

					//this is the key to the whole thing.
					//we need to check everyone is ahppy with what they are going to do......
					//
					//1. add up netforms
					
					//2. if import headroom then modulate everyone else to keep under headroom 
					//3. if no import headroom then get excess from netforms
					//4. discharge all at modulated rate for cover excess.
		
	    },
		netformFactor:function(){
				 time_to_depart = this.onSlotTime+this.user.duration-sim.time(); //this.arrival+this.user.duration-sim.time();//user.timeend-system.time;

				 //include top RDC current drop
				 charge_throttle_threshold = this.model.MaxCapacity*this.model.C_RDC
				  remain_charge_high = charge_throttle_threshold-this.current

				  remain_time_high = remain_charge_high > 0 ?
				  						remain_charge_high / (this.model.C_Rate1/60):
				  						0;

				  remain_charge_low = this.current >=charge_throttle_threshold ?
				  	   					this.model.MaxCapacity-this.current:
				  						this.model.MaxCapacity-charge_throttle_threshold;

				  remain_time_low = remain_charge_low/(this.model.C_Rate2/60)
			     time_to_full = remain_time_low + remain_time_high

			     nff= (time_to_full/time_to_depart).toFixed(3)
				 this.netFF = nff  //time_to_end //nF //(1/nF).toFixed(2)
				 return nff//true;
			},
		selfCharge:function(){//if not given any commands then charge if netform requires.
					//this should override any message commands..
					//this.netformFactor();
					//if(this.netFF>=1){
					//		this.command=1;
					//	}
					//	else {this.command=2}
					//this.command=2;
					this.checkQueue();
					//this.command=2;
				
					this.charge(true)
					this.charge(false);//do prediction...
					this.setTimer(1).done(function(){this.selfCharge()});//loop control
					
		},
		leavefacility:function(){
			
        		this.departure = sim.time();//this.arrival + this.user.duration;
        		this.facilitySlot = 0;
        		this.statusCode = -1;
        		this.statusText="Exited";
        		this.chargeStatus=0;
        		this.rate=0;

        	
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
		        Park.total++;
		        this.useFacility(Park, useDuration)//facility manages time and departure
		        	.done(this.leavefacility)
		        	//.waitUntil(10,this.leavefacility())
		        	.setData(this.id);
		        //set next 
		        this.checkQueue();
		        this.selfCharge();
		       

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
		    			 if(this.statusCode==1){this.onSlotTime=sim.time();}
	    			break;
	    			case 1:
	    				this.statusText="on point";
	    			break;

	    		}
	    },
	    onMessage:function(s,m){
	    		this.checkQueue()
	    		if(Park.inQueue(this.id)){this.status="Awaiting charge point"}
	    		switch (m.c){
	    			case "status":
	    				this.NF_vehStatus = m.data;
	    				this.Constraints = m.control;

	    				st = (100*this.current/this.model.MaxCapacity).toFixed(0)
	    				this.send({statusCode:this.statusCode,
	    						   rate:this.rate.toFixed(0),
	    						   percent:st,
	    						   netform:	this.netFF,//this.netformFactor(),//this.netFF,
	    						   chargeStatus:this.chargeStatus,
	    						   model:this.model,
	    						   user:this.user,
	    						   arrival:this.arrival,
	    						   departure:this.departureTime,
	    						   prediction:this.prediction,
	    						   netMod:this.netformModulation
	    							},
	    						   0,
	    						   s);
	    			break;
	    			case "charge":
	    			//when import is required...
	    				//this.command=1;this.charge();
	    				//add in automatic charge at slow rate to 60% lowest expected??.. before high rate if NFF
	    			break;
	    			case "discharge":
	    				this.command=-1;//this.charge();
	    			break;
	    				case "hold":
	    				this.command=0;
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
 		vehlog:[],
 		dischargeEvents:[],
 		Constraints:{},
 		sendTick:function(){
 							this.setTimer(1).done(function(){this.sendTick()})
 						},
 		askStatus:function(){
 							system.log.push({Veh:this.vehStatus,Cap:Park.caps(),Park:Park.status()})
 			               	this.vehStatus=[];

 			               	//request data from vehicle...
 							this.send({c:"status",data:this.vehStatus,control:this.Constraints},0);
 							this.setTimer(1).done(function(){
								this.askStatus()
							})
 						},
 		askCommand:function(){this.send({c:"charge",data:this.vehStatus},0)},
 		periodTick:function(){//set 30min related items
 								period = Math.floor(sim.time()/30)
 								period =  period > 47 ? 0: period
		        				nextPeriod = period+1 > 47 ? 0: period+1
		       					previousPeriod = period-1 > 0 ? period-1:47
		        				periodPop = Cp[period]*SLOTS
		        				previousPeriodPop = sim.time()<30 ? 0: Cp[previousPeriod]*SLOTS
		        				addPop = periodPop - previousPeriodPop
		        				addPop =  addPop<=0?0:addPop
		        				this.vehArrival(addPop,sim.time(),sim.time()+30)
 								//console.log(period,periodPop,previousPeriodPop,addPop)
			 					this.setTimer(30).done(function(){//do it again
			 								this.periodTick();
			 					})
 		},
 		vehArrival:function(pop,start,stop){//deals with 30 tick period...
 			//frquency for next
 			//console.log(sim.time(),pop,start,stop)

 			if (sim.time()<stop){
 					this.setTimer(random.normal(30/pop,1)).done(function(){//set time to next vehicle...can be more complex
		        			sim.addEntity(Vehicle);
		        			this.vehArrival(pop,start,stop);
		        	});
			}
 		},
 		start:function(){
 							if(system.control.discharge){this.setDischargeEvents()};//set up discharge requests.
 						//console.log("controller started");
 							this.Constraints = {exportCap:system.control.export_cap,importCap:system.control.import_cap}
 							this.askStatus();//set data logging going
 				
 							this.discharge();//set discharge going
 							this.periodTick();//set half houly update going

 							//this.askCommand();
 							//fire random events fro discharging and charging...... including how long for...
 							//this.sendTick();
 						},
 		setDischargeEvents:function(){
 			this.dischargeEvents.push({type:"Discharge",start:50,stop:80,capacity:100})
 			this.dischargeEvents.push({type:"Discharge",start:90,stop:200,capacity:100})
 		},
 		discharge:function(){
 			//function needs to have array of discharge events
 			//loop through events and discharge as required...
 			disTrigger=false;
 			disCap=0;
 			 for(i=0;i<this.dischargeEvents.length;i++){
 				 	 	d=this.dischargeEvents[i]
 				 	
	 			 	if (sim.time()>d.start && sim.time()<d.stop){
		 			 	disTrigger=true;
		 			 	disCap+=d.capacity;
	 			 	}
 			 }
 			if (disTrigger){
 				this.send({c:"discharge",data:this.vehStatus},0)
 			}
 			else {this.send({c:"hold",data:this.vehStatus},0)}
 			this.setTimer(1).done(function(){this.discharge()})
 			//if export cap then ask for each avialable then  share between 

 		},
 		netformNegotiation:function(){
 			//ask for predicted 
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
	//console.log(Park)
	console.log("Simulation End")
	//console.log(sim)
	system.simtime=SIMTIME
	system.events=Controller.dischargeEvents
	sim.finalize()
	//console.log(Controller.log)
	$("#controlpanel").show()
	$(".controls").show()
	//stats_vehicles.finalize(sim.time())
	//visualise(log);
	//console.log(stats_vehicles.getHistogram())      // start simulation
   // Park.report();  
}

//
//
// system controls
function systemControl(con,sta){
	console.log(con,sta)
	system.control[con]=sta

}
// output functions (todo move to separate file)



var system = {
	control:{discharge:true,slow_charge:true,import_cap:20,export_cap:50},
	events:[],
	paused:true,
	simtime:0,
	simDateTime:0,
	time:-1,
	log:[],
	plots:{
			capacityCurrent:{name:"Available Capacity (kWh)",x:[],y:[],type:"scatter"},
			capacityMax:{name:"Max Capacity (kWh)",x:[],y:[],type:"scatter"},
			energyFlow:{name:"Import/Export (kW)",x:[],y:[],type:"scatter"},
			population:{name:"Population",x:[],y:[],type:"scatter"},
		},
	// plot1:{name:"Available Capacity (kWh)",x:[],y:[],type:"scatter"},
	// plot2:{name:"Max Capacity (kWh)",x:[],y:[],type:"scatter"},
	// plot3:{name:"Import/Export (kW)",x:[],y:[],type:"scatter"},
	// plot4:{name:"Population",x:[],y:[],type:"scatter"},
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
	$("#systemtime").html(system.time + " | " + getTimefromSystem(system.time));
	document.title = 'Netform' + "  |" + system.time + "/" + system.simtime ;
	visualise(system.log[stime],stime)
	//console.log(system.log[stime])
	if(!system.paused){if(stime<system.simtime){
						setTimeout(function(){ 
							system.tick()}, $("#timestep").val())};
					 }
}

function getTimefromSystem(sTime){
	hour = Math.floor(sTime/60)
	minutes = sTime % 60

	system.simDateTime = new Date(2017,4,1,hour,minutes,0)
	return system.simDateTime
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
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
	dArr=arr.Veh

	for (i=dArr.length-1;i>=0;i--){

			state="On charger"
			if(dArr[i].message.statusCode<0){state="Exited"}
			if(dArr[i].message.statusCode==0){state="In Queue"}
			
			colour="#ccc";
			alpha = dArr[i].message.rate<0?-1*dArr[i].message.rate/veh_maxchargerate:dArr[i].message.rate/veh_maxchargerate;
			if(dArr[i].message.chargeStatus<0){colour="rgba(100,0,0," + alpha + ")";}
			// if(dArr[i].message.chargeStatus==1){colour="darkgreen";}
			// if(dArr[i].message.chargeStatus==2){colour="lightgreen";}
			if(dArr[i].message.chargeStatus>0){colour="rgba(0,100,0," + alpha + ")";}

			
			battmaxcap = dArr[i].message.model.MaxCapacity
		//console.log(arr)
			o=""
			o+="<div class='veh'><div class='veh_id'>" + dArr[i].s +  "</div>";
			o+="<div class='veh_status'>" + dArr[i].message.model.Name + "</div>";
			o+="<div class='veh_status'>" + state + "</div>";
			//if(state!="Exited"){
			o+="<div class='veh_maxcap'><div class='status_vis' style='width:"+battmaxcap+"%'><div class='veh_state_vis' style='background-color:"+colour+";width:"+dArr[i].message.percent+"%'></div></div></div>"
			o+="<div class='veh_state'>"+dArr[i].message.rate+" kW | NF:" + dArr[i].message.netform + "|" +dArr[i].message.chargeStatus + "|"+ dArr[i].message.netMod + "</div>"
			//}
			o+="</div>"
			
			out+=o

			if(state=="On charger"){on+=o;n+=1}
			if(state=="In Queue"){qu+=o;n+=1}	
			if(state=="Exited"){ex+=o}
			
			ie+=1*dArr[i].message.rate

			//add rate * chargestatus to bin for import export


	}

	//show system events
	se=""

	for(i=0;i<system.events.length;i++){
		if(system.time>=system.events[i].start && system.time<=system.events[i].stop){
			se=system.events[i].type
		}
		
	}
	$("#systemevents").html(se)
	
	//current
	//
	dt = getTimefromSystem(system.time)
	
	system.plots.capacityCurrent.x.push(dt)
	system.plots.capacityCurrent.y.push(arr.Cap.currentCap)
	//total capacity
	system.plots.capacityMax.x.push(dt)
	system.plots.capacityMax.y.push(arr.Cap.maximumCap)
	//import/export
	//
	
	system.plots.energyFlow.x.push(dt)
	system.plots.energyFlow.y.push(ie)
	//export
	
	system.plots.population.x.push(dt)
	system.plots.population.y.push(arr.Park.onSlot)
	
	$("#list").html(on)
	$("#queue").html(qu)
	$("#exit").html(ex)

   system.time  == 0?plot():replot();
}

function replot(){
		Plotly.redraw('plot_capacity');
		Plotly.redraw('plot_energy_flow');
		Plotly.redraw('plot_population');
}
function plot(){
		var layout = {
		  showlegend: true,
		  legend: {
		    x: 0.1  ,
		    y: 1.2
		  }
		}

	

	Plotly.newPlot('plot_capacity', [system.plots.capacityCurrent,system.plots.capacityMax],layout);
	Plotly.newPlot('plot_energy_flow', [system.plots.energyFlow],layout);
	Plotly.newPlot('plot_population', [system.plots.population],layout);
}

function tickstep(v){system.tick()}

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