//using sim.js library from http://simjs.com/   **updated version avialble @https://github.com/btelles/simjs-updated


//ADD CHARGE DISCHARGE EVENTS..
//START SIMPLE.. 


			       require("datejs");
			  fs = require('graceful-fs');
			path = require('path');
		var conf = require("./config");
		var zlib = require('zlib');
	  var appDir = conf.appRoot;//path.dirname(require.main.filename);

//local modules
	   var config = require(path.join(appDir, "sim_modules", "config"));
		var write = require(path.join(appDir, "sim_modules", "logs"));
		var users = require(path.join(appDir, "sim_modules", "users"));
		var Simjs = require(path.join(appDir, "sim_modules", "sim-0.26"));

//load up data arrays
   var dataFolder = path.join(appDir, "data");
	   var cModes = require(path.join(dataFolder, "charging_modes"));
	     var vArr = require(path.join(dataFolder, "vehicles"));
	     var uArr = require(path.join(dataFolder, "user_types"));
var profile_solar = require(path.join(dataFolder, "profile_solar"));
    var API_MCS24 = require(path.join(dataFolder, "PV_API"));
      var CarPark = require(path.join(dataFolder, "profile_parking"));
           var Cp = CarPark.commuterCP

exports.test = function test() { return 'Hello' }//pointless test function

//add sim libraries
		  var Sim = Simjs.Sim;
       Sim.Random = Simjs.Random;

//main simulation function
exports.simulate = function (simData) {
	//set hosted or localhost
	var isLocal = global.isLocal //false //process.env.OPENSHIFT_NODEJS_IP?false:true;
	console.log("Am i local?", isLocal)

	write.setSimStatus(1)
	//console.log("full config file",simData)
	//console.log(simData)
	var settings = [] //simulation settings
	var vehicleslist = [] //list of active vehicles.
	var vehicleData = [];
	//var simID = "" //new Date().getTime() //"biglog";

	// unless you pass a simID i will todays date and overwrite
	//console.log("simdata",simData.simID)

	var simID = (simData.simID == '' || simData.simID == 'undefined') ? Date.today().toString("yyyy_MM_dd") : simData.simID//"biglog";

	//console.log("SIMID:",simID)
	var simFolder = write.makeSimFiles(simID)
	var sim = new Sim(simID);
	//sim.addEntity
	var random = new Sim.Random(simData.simSeed);
	var number_of_vehicles = 0

	settings.push(simID)
	settings.push(simData)
	settings.PCusers = simData.PCusers// JSON.parse(fs.readFileSync(write.folders.userFile));
	settings.PCusersSim = [];
	var sysLog = []
	//var oData=simData
	//console.log("========")
	//console.log(simData)
	//console.log("========")

	//load PCuser list
	//console.log(settings.PCusers)


	//initial simulation objects

	//park is facility that allows entities to arrive a depart. park object manages timing and queueing ...
	// also records statistical data for later
	var Park = new Sim.Facility("park", Sim.Facility.FCFS, simData.simSlots + settings.PCusers.length) //set up facility with extra slots for live users
	
	//simple call to get the object for debug
	Park.report = function () { console.log(this) };
	
	//get current energy flow and battery capacity based on active vehicles (entities)
	Park.caps = function () {
		st = sim.entities
		ca = 0;
		cu = 0;
		if (st.length > 1) {
			for (i = 1; i < st.length; i++) {
				if (st[i].statusCode == 1) {
					cu += st[i].current
					ca += st[i].model.MaxCapacity
				}
			}
		}
		return { currentCap: cu, maximumCap: ca };
	};

	//get current status of facility
	Park.status = function () {
		f = this.free //number of avialable slots
		q = this.queue.data.length//population in queue
		ps = this.stats.population - q;
		pq = q;
		t = this.total
		pe = t - this.stats.population;
		// s=sim.entities

		return { SlotsFree: f, onSlot: ps, Queue: pq, Exited: pe, Total: t, GenSolar: this.solarGeneration.tickOutput("May", sim.time()) }
	}
	Park.total = 0;
	Park.inQueue = function (id) {
		q = 1;
		t = this.queue.data;
		for (i = 0; i < t.length; i++) {
			if (t[i].entity.id === id) { q = 0 }
		}
		//console.log(id,q,sim.time(),this.queue.data)
		return q;
	};

	//add other energy sources and uses. - currently only solar
	Park.solarGeneration = {
		profile: {},
		init: function () {
			//get profile and adjust for system size.
			//turn daily into actual..
			//get system size from data settings file
			for (i = 0; i < profile_solar.length; i++) {
				monthly = profile_solar[i].Monthly * simData.solarOut
				data = [];
				for (j = 0; j < 24; j++) {
					data.push(profile_solar[i][j] * monthly)
					data.push(profile_solar[i][j] * monthly)//do again for 23 period data
				}

				this.profile[profile_solar[i].Month] = { "monthly": monthly, "data": data }
			}
		},
		periodOutput: function (month, period) {
			//get output for simualation period from input profile (ie which 30 minute interval for solar)
			return this.profile[month].data[period] / Date.getDaysInMonth(2017, Date.getMonthNumberFromName(month))
		},
		tickOutput: function (month, tick) {
			//interpolate solar output to each minute (tick)
			period = Math.floor(tick / 30)
			period = period > 47 ? 0 : period
			genSolar = Park.solarGeneration.periodOutput(month, period)


			return this.profile[month].data[period] / Date.getDaysInMonth(2017, Date.getMonthNumberFromName(month))
		}
	}
	//add static battery storage -- TBC
	Park.batteryStorage = {}
	//initialise facility extras 
	Park.solarGeneration.init(); 

	//controller - starts,stops and provided global functions for the sim
	var Controller = {
		xlog: [],
		vehStatus: [],
		vehlog: [],
		dischargeEvents: [],
		Constraints: {},
		PCusersSim: [],
		finalize: function () { },//sysLog = this.xlog;console.log("controller shut down")},
		sendTick: function () {
			this.setTimer(1).done(function () { this.addPC(); this.sendTick(); })
		},
		addPC: function () {//pretty sure this is dead....
			//	var pclist = pcUserArray[sim.time()] ? pcUserArray[sim.time()] : []
			//console.log("adding",sim.time(),pclist)
			// pclist.array.forEach(function (pcu) {
			// 	sim.addEntity(Vehicle);
			// });


		},
		//primary function to get info from simulation
		askStatus: function () { 
			//console.log(this)
			period = Math.floor(sim.time() / 30)
			period = period > 47 ? 0 : period
			genSolar = Park.solarGeneration.periodOutput("May", period)
			//console.log(Controller.log)
			// sysLog.push({Veh:this.vehStatus,Cap:Park.caps(),Park:Park.status()})
			if (isLocal) {
				write.timelog(write.folders.sys, sim.time(), { Veh: this.vehStatus, Cap: Park.caps(), Park: Park.status() }, true);

			}

			this.vehStatus = [];
			var vd = vehicleData;
			if (!isLocal) {
				vd = vehicleData.filter(function (el) { return el.nfAppId != '' })
			}
			write.timelog(write.folders.veh, sim.time(), vd, true)
			//write.timelog(write.folders.veh, sim.time(), vehicleData, true)
			vehicleData = [];
			//request data from vehicle...
			this.send({ c: "status", data: this.vehStatus, control: this.Constraints }, 0);
			this.setTimer(1).done(function () {
				this.askStatus()
			})
		},
		askCommand: function () { this.send({ c: "charge", data: this.vehStatus }, 0) },
		periodTick: function () {//set 30min related items
			period = Math.floor(sim.time() / 30)
			period = period > 47 ? 0 : period
			nextPeriod = period + 1 > 47 ? 0 : period + 1
			previousPeriod = period - 1 > 0 ? period - 1 : 47
			periodPop = Cp[period] * simData.simSlots
			previousPeriodPop = sim.time() < 30 ? 0 : Cp[previousPeriod] * simData.simSlots
			addPop = periodPop - previousPeriodPop
			addPop = addPop <= 0 ? 0 : addPop
			this.vehArrival(addPop, sim.time(), sim.time() + 30)
			this.setTimer(30).done(function () {//do it again
				this.periodTick();
			})
		},
		vehArrival: function (pop, start, stop) {//deals with 30 tick period...

			if (sim.time() < stop) {//if sim should be running 
				this.setTimer(random.normal(30 / pop, 1)).done(function () {//set time to next vehicle...can be more complex
					sim.addEntity(Vehicle);
					this.vehArrival(pop, start, stop);
				});
			}
		},
		start: function () {
			//sort added users
			//add arrival time in ticks
			//departure time in ticks
			console.log(simData)
			if (simData.eventsSwitch) { this.setDischargeEvents(simData) };//set up discharge requests.

			//console.log("controller started");
			this.Constraints = { exportCap: simData.constraintsExportCap, importCap: simData.constraintsImportCap }
			this.askStatus();//set data logging going

			this.discharge();//set discharge going
			this.periodTick();//set half houly update going
			this.sendTick();//set minute events
		
			settings.PCusers.forEach(function (element) {
				this.setTimer(element.simArrival).done(function () {
					//console.log("loop", sim.time(),element);
					sim.addEntity(Vehicle);
				});
			}, this);
		},
		setDischargeEvents: function (data) {
			//get events from data file..
			//if config say use type then get that file
			//console.log("events setup",data)
			//load file based on config
			event = JSON.parse(fs.readFileSync(path.join(write.folders.data, "events", "EFR_narrow.json"), "utf-8"));
			//get month from sim data
			var datemonth = (new Date(data.simDate)).toString("MMM");
			//add events for correct month			
			event[datemonth].forEach(function (d) {
				Controller.dischargeEvents.push({ type: d.type, start: d.start, stop: d.stop, capacity: 100 })
			});

			//this.dischargeEvents.push({ type: "Discharge", start: 50, stop: 80, capacity: 20 })
			//this.dischargeEvents.push({ type: "Discharge", start: 90, stop: 200, capacity: 100 })
			//this.dischargeEvents.push({ type: "Discharge", start: 480, stop: 550, capacity: 100 })
		},
		discharge: function () {
			//function needs to have array of discharge events from controller.dischargeEvents[]
			//loop through events and discharge as required...
			disTrigger = false;
			disCap = 0;
			for (i = 0; i < this.dischargeEvents.length; i++) {
				d = this.dischargeEvents[i]

				if (sim.time() > d.start && sim.time() < d.stop) {
					disTrigger = true;
					//limit capacity to hard limits
					disCap = disCap > d.capacity ? disCap : d.capacity;
				}
			}
			if (disTrigger) {
				this.send({ c: "discharge", data: this.vehStatus, capacity: disCap }, 0)
			}
			else { this.send({ c: "hold", data: this.vehStatus }, 0) }
			this.setTimer(1).done(function () { this.discharge() })//loop with tick
			//if export cap then ask for each avialable then  share between 

		},
		netformNegotiation: function () {
			//ask for predicted 
		},
		onMessage: function (sender, message) {
			s = sender.id;
			this.vehStatus.push({ s, message })
			//on
			//console.log(sender.id,message);
			//document.getElementById("log").innerHTML += "<pre>"+message.entityId+"</pre>";
		}
	}

	//vehicle object
	var Slot = {
		type: "Standard",
		modes: [3, 7, 22]
	}


	var Vehicle = {
		statustext: "Awaiting charge point",
		statusCode: 0,// 0 - in queue, 1-on charge point , -1 - exited
		chargeStatus: 0, // 0 = not charging  // 1 = mode 1 charging   2= mode 2 charging // -1 mode 1 discharging  // -2 mode 2 discharging
		chargeStart: 0,// time from start charging (for ramp up time)
		netformStatus: 0,//0=not affect, number = modulation
		netformModulation: 1,
		prediction: {},//provides netform control for modulating rate/discharge...
		state: "",
		nfAppId: "",
		NF_vehStatus: [],
		Constraints: [],
		//log:[],
		model: "",
		user: "",
		current: 0,
		rate: 0,//negative for discharge/positive for charge
		//netformFactor:0
		netFF: 0,//set using netformfactor function
		netFFPredicted: 0,
		arrival: 0,
		onSlotTime: 0,
		departure: 0,
		departureTime: 0,
		facilitySlot: 0,
		command: 0, //default is charge //will need to object at some point to enable fast,slow chage and discharge/ currently is  
		start: function () {
		
			//using the sim,time  find if this is a user vehicle
			var isPCarray = settings.PCusers.filter(function (el) { return el.simArrival == sim.time() })

			if (isPCarray.length == 1) {
				this.model = isPCarray[0].model
				this.user = isPCarray[0].user
				this.nfAppId = isPCarray[0].uid
			}
			else {
				this.model = vArr[(random.random() * (vArr.length - 1)).toFixed(0)];
				this.user = uArr[(random.random() * (uArr.length - 1)).toFixed(0)];
			}

			//console.log("vehadd", sim.time(), this)
			this.current = random.uniform(1, this.model.MaxCapacity);//current battery charge
			var useDuration = this.user.duration//TODO - add normal around this number

			this.arrival = sim.time();
			this.departure = sim.time() + useDuration


			Park.total++;

			vehicleslist.push({
				"id": this.id,
				"arrTime": this.arrival,
				"model": this.model,
				"user": this.user,
				"cCharge": this.current
			})

			this.useFacility(Park, useDuration)//facility manages time and departure
				.done(this.leavefacility)
				//.waitUntil(10,this.leavefacility())
				.setData(this.id);
			//set next 
			this.checkQueue();
			this.selfCharge();
		},
		charge: function (live) {//live uses NF modulator, and updates this..  --- not live updates predition object..
			//if(this.id==2){console.log(live,sim.time(),this.current,this.prediction)}
			switch (this.statusCode) {
				case 1: //on charge point
					//capture current conditions for prediction run/
					rate = this.rate
					current = this.current
					chargeStatus = this.chargeStatus
					chargeStart = this.chargeStart
					this.netformFactor();
					//run negotiation to set modulator....
					//this.netformModulation = this.negotiation()
					//add ramp up time (use rd???)
					chargeStatus = this.command //default to request						
					// if netform factor requires then charge me.
					if (this.netFF > 1) { chargeStatus = 1 }//fire netform....

					if ((current / this.model.MaxCapacity) > this.model.C_RDC && chargeStatus > 0) { chargeStatus = 2 }//slow drop towards top.
					if (chargeStatus == 0 && simData.allowSlowCharge) { chargeStatus = 2 }
					//console.log(simData)
					//do negotiation here...
					//
					neg = live ? this.negotiation(chargeStatus, rate) : { "status": chargeStatus, "rate": rate }

					chargeStatus = live ? neg.status : chargeStatus;
					netformModulation = live ? neg.rate : 1;

					//this.id==2&&live?console.log(sim.time(),this.netFF,this.netFFPredicted,netformModulation):false
					//(this.id==6&&sim.time()>500&&sim.time()<550&&live)?console.log(sim.time(),chargeStatus,neg.rate,rate):false;
					if (this.model.MinCharge <= current && current <= this.model.MaxCapacity) {// if able to charge/discharge.
						//	this.chargeStatus = this.command;//accept request // following  if statements  qualify
						//rd=1//rate direction + charging - discharging and ramp time
						switch (chargeStatus) {
							case 2:
								rate = netformModulation * this.model.C_Rate2;
								chargeStart++;
								chargeStart = chargeStart < 0 ? 1 : chargeStart;
								if (chargeStart < this.model.C_RUT) {
									rate = rate * chargeStart / this.model.C_RUT
									//	if(this.id==2){console.log(rate)}
								}
								break;
							case 1: //charge
								rate = netformModulation * this.model.C_Rate1;
								chargeStart++;
								chargeStart = chargeStart < 0 ? 1 : chargeStart;
								if (chargeStart < this.model.C_RUT) {
									rate = rate * chargeStart / this.model.C_RUT
								}
								break;
							case -1: //discharge at default
								rate = (netformModulation * -1 * this.model.D_Rate);
								chargeStart--;
								chargeStart = chargeStart > 0 ? -1 : chargeStart;

								if (chargeStart > -this.model.C_RUT) {
									rate = rate * -1 * chargeStart / this.model.C_RUT
								}
								break;
							case 0: //hold
								rate = 0;
								chargeStart = 0
								break;
							default:
						}
					};

					current += rate / 60;

					if (current > this.model.MaxCapacity && rate > 0) {
						current = this.model.MaxCapacity;
						rate = 0;//add default to do nothing...
						chargeStatus = 0;//default
					}

					if (current < this.model.MinCharge && rate < 0) {
						current = this.model.MinCharge;
						rate = 0;//add default to do nothing...
						chargeStatus = 0;//default
					}

					//if not prediction
					if (live) {
						this.rate = rate
						this.current = current
						this.chargeStatus = chargeStatus
						this.chargeStart = chargeStart

						return true;
					}
					else {
						this.prediction = {
							rate: rate,
							current: current,
							chargeStatus: chargeStatus,
							chargeStart: chargeStart,
							netform: this.netFFPredicted
						}
						this.charge(true);
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
//************************************************************************************/
		negotiation: function (cStatus, cRate) {
			v = this.NF_vehStatus
			//if(this.id==4){console.log(v)}
			//oRate=this.rate;
			//oCS=this.chargeStatus;
			this.netformStatus = cStatus;//pass through from calc by default
			this.netformModulation = 1;
			aRate = 0;  //message.
			nfRate = 0;
			rate = 0;
			nfList = []
			list = [];
			tList = [];
			nfMod = 1;//modulate rate.... nf

			//Mod=1;//modulate rate other
			//if(this.id==4){sim.time(),console.log(v)}
			//set up data streams
			for (i = 0; i < v.length; i++) {
				if (v[i].message.statusCode != 1) { continue; }

				//v[i].s==6?console.log(v[i]):false
				x = v[i].message.prediction;
				//rd=(x.chargeStatus>=0?1:-1)
				tList.push(v[i])
				aRate += (1 * x.rate);//get max rate..
				if (x.netform > 1) {//add netform >1 to arr
					nfList.push(x);
					nfRate += (1 * x.rate)
				}
				else {
					list.push(x);
					rate += (1 * x.rate)
				};

			}
			//check against capacity (import)
			//if(this.Constraints[0])
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

			period = Math.floor(sim.time() / 30)
			period = period > 47 ? 0 : period
			genSolar = Park.solarGeneration.periodOutput("May", period)

			importcap = this.Constraints.importCap;
			exportcap = -this.Constraints.exportCap;
			//Capacity scenarios

			//scenario 1: all is fine
			NFmodRate = 1
			nonNFModRate = 1
			NFStatus = this.netformStatus
			nonNFStatus = this.netformStatus

			//genSolar=0
			//adjust capacity limits for solar generation
			importcap = importcap + genSolar
			exportcap = exportcap - genSolar

			if (this.Constraints && aRate >= importcap) {
				//scenario 2: NF is good, other modulate,,
				nonNFModRate = (importcap - nfRate) / rate;  // first modulate non nf leaving nf
				NFmodRate = 1;
				//scenario 3: NF is over > stop other, modulate NF
				if (nfRate > importcap) {
					nonNFModRate = 0;
					nonNFStatus = 0;
					NFmodRate = (importcap) / nfRate
					//console.log(sim.time(),NFmodRate)
				}
			}

			if (this.Constraints && aRate <= exportcap) {
				//scenario 4: discharge cap	
				nonNFModRate = (exportcap) / aRate;  // first modulate non nf leaving nf
			}

			//what am i , what should i do...
			this.netformModulation = this.netFF > 1 ? NFmodRate : nonNFModRate;

			//	this.netformModulation=nfMod
			this.netformStatus = NFStatus
			//this.netformStatus=this.chargeStatus

			//this.id==2?
			return { rate: this.netformModulation, status: this.netformStatus }
		
			//***************this is the key to the whole thing.
			//we need to check everyone is happy with what they are going to do......
			//
			//1. add up netforms
			//2. if import headroom then modulate everyone else to keep under headroom 
			//3. if no import headroom then get excess from netforms
			//4. discharge all at modulated rate for cover excess.

		},
		netformFactor: function () {
			time_to_depart = this.onSlotTime + this.user.duration - sim.time(); //this.arrival+this.user.duration-sim.time();//user.timeend-system.time;

			//include top RDC current drop
			charge_throttle_threshold = this.model.MaxCapacity * this.model.C_RDC
			remain_charge_high = charge_throttle_threshold - this.current

			remain_time_high = remain_charge_high > 0 ?
				remain_charge_high / (this.model.C_Rate1 / 60) :
				0;

			remain_charge_low = this.current >= charge_throttle_threshold ?
				this.model.MaxCapacity - this.current :
				this.model.MaxCapacity - charge_throttle_threshold;

			remain_time_low = remain_charge_low / (this.model.C_Rate2 / 60)
			time_to_full = remain_time_low + remain_time_high

			//nff= (time_to_full/time_to_depart).toFixed(3)
			this.netFF = (time_to_full / time_to_depart).toFixed(3)//nff  //time_to_end //nF //(1/nF).toFixed(2)
			this.netFFPredicted = ((time_to_full) / (time_to_depart - 1)).toFixed(3)
			return this.netFF//true;
		},
//************************************************************************************* */
		selfCharge: function () {//if not given any commands then charge if netform requires.
			//this should override any message commands..
			//this.netformFactor();
			//if(this.netFF>=1){
			//		this.command=1;
			//	}
			//	else {this.command=2}
			//this.command=2;
			this.checkQueue();
			//this.command=2;

			this.charge(false)
			//	this.charge(false);//do prediction...
			this.setTimer(1).done(function () { this.selfCharge() });//loop control

		},
		leavefacility: function () {

			this.departure = sim.time();//this.arrival + this.user.duration;
			this.facilitySlot = 0;
			this.statusCode = -1;
			this.statusText = "Exited";
			this.chargeStatus = 0;
			this.rate = 0;
		},

		checkQueue: function () {//while in queue check and set inque = false once entered facility
			//console.log(sim.time(),this.id,Park.inQueue(this.id))
			switch (this.statusCode) {
				case -1:
					this.statusText = "Gone baby gone"
					this.statusCode = -1;
					break;
				case 0:
					this.status = "Awaiting charge point!"
					this.statusCode = 0;
					this.statusCode = Park.inQueue(this.id);
					if (this.statusCode == 1) { this.onSlotTime = sim.time(); }
					break;
				case 1:
					this.statusText = "on point";
					break;

			}
		},
		onMessage: function (s, m) {
			this.checkQueue()
			if (Park.inQueue(this.id)) { this.status = "Awaiting charge point" }
			switch (m.c) {
				case "status":
					this.NF_vehStatus = m.data;
					this.Constraints = m.control;

					st = (100 * this.current / this.model.MaxCapacity).toFixed(0)
					this.send({
						statusCode: this.statusCode,
						rate: this.rate.toFixed(4),
						percent: st,
						netform: this.netFF,//this.netformFactor(),//this.netFF,
						chargeStatus: this.chargeStatus,
						//model:this.model,
						user: this.user,
						nfAppId: this.nfAppId,
						arrival: this.arrival,
						departure: this.departure,
						prediction: this.prediction,
						netMod: this.netformModulation
					},
						0,
						s);

					var logObj = {
						"id": this.id,
						"nfAppId": this.nfAppId,
						"statusCode": this.statusCode,
						"rate": this.rate.toFixed(4),
						"percent": st,
						//"netform":	this.netFF,//this.netformFactor(),//this.netFF,
						"chargeStatus": this.chargeStatus,
						//model:this.model,
						//user:this.user,
						"arrival": this.arrival,
						"departure": this.departure
					}


					this.statusCode == 1 ? vehicleData.push(logObj) : false
					break;
				case "charge":
					//when import is required...
					//this.command=1;this.charge();
					//add in automatic charge at slow rate to 60% lowest expected??.. before high rate if NFF
					break;
				case "discharge":
					this.command = -1;//this.charge();

					break;
				case "hold":
					this.command = 0;
					break;
				default:
			}
		},

		finalize: function () { },
	}//end??? sim function



	sim.addEntity(Controller)
	sim.simulate(simData.simLength);
	sim.finalize()

	write.timelog(simFolder, "settings", [settings, vehicleslist, Controller.dischargeEvents], false)
	console.log("Simulation End")
	write.setSimStatus(0)
	return [simID, [settings, vehicleslist, Controller.dischargeEvents]] //Controller.log

}//end function

function setupModels(simData) {
	console.log("___________settting models up")
}

