function startsim(){console.log("Starting Simulation")
		netformSimulation(1200,1234)
		}  //using minutes for now
function stopsim(){console.log("Stopping Simulation")}

var vArr = [{type:"Tesla P85D",MaxCapacity:85,cRate:20},
			{type:"Nissan Leaf",MaxCapacity:35,cRate:5},
			{type:"BMW i8",MaxCapacity:40,cRate:10},
			{type:"Smart 2Four",MaxCapacity:25,cRate:2}]

var uArr = [{type:"commute1",duration:240},
			{type:"commute2",duration:480},
			{type:"24hrs",duration:1440}]

function netformSimulation(SIMTIME,SEED){
	//set simulation parameters
	var sim = new Sim("Netform");
	var random = new Random(SEED);
	var stats = new Sim.Population("cars");
	//make events
	//external events
	//demand for FFR, store, import, export
	//arrival of vehicles... trains,  airplanes.

	//add capacity check event

	var Park = new Sim.Facility("park", Sim.Facility.FCFS,10)
	var Total = new Sim.Buffer("total capacity",10000)
	Park.report = function(){console.log(this)};

	var capacity = new Sim.Event("check available capacity")
	var charge = new Sim.Event("Charge vehicle")
	//var energy =[new Sim.event("charging"),new Sim.event("discharging")]

	var Vehicle = {
		model:"",	
		user:"",
		current:0,
		rate:0,//negative for discharge/positive for charge
		netformFactor:0,
		arrival:0,
		departure:0,
		discharging:function(){},
		netformFactor:function(){
				 time_to_depart = this.departure-sim.time();//user.timeend-system.time;
				 remaining_charge = this.model.MaxCapacity-this.current
				// nF=((this.model.MaxCapacity-this.current)* this.user.cRate)/time_to_depart;
				 return ((remaining_charge / (this.model.cRate/60))/time_to_depart).toFixed(1)  //time_to_end //nF //(1/nF).toFixed(2)
			},
		enterfacility:function(){
	        		this.putBuffer(Total,this.model.MaxCapacity);
	        		this.arrival = sim.time();
	        		this.departure = this.arrival + this.user.duration;
	        		//console.log(Total.current(),Park.queueStats());
	        		console.log(this)
	        		}),
	    start: function () {
	    	//get vehicle type
	    	this.model=vArr[(random.random()*(vArr.length-1)).toFixed(0)];
	    	this.user=uArr[(random.random()*(uArr.length-1)).toFixed(0)];

	        var useDuration = this.user.duration//random.normal(10,5); // time to use the park
	        this.useFacility(Park, useDuration)
	        	.setData("id:"+this.id)
	        	.done(this.enterfacility);
	        this.current=random.uniform(1, this.model.MaxCapacity);
	    	//this.send(this.modeltype,0,1)
	    	//trigger a time after

	        this.setTimer( random.normal(5,2)).done(function(){
	        			sim.addEntity(Vehicle); 	
	        	})
	    	},
	    onMessage:function(s,m){this.send(this.sim,0, s)},
	    finalize:function(){ this.getBuffer(Total,this.model.MaxCapacity)},
	}

 	var Controller = {
 		sendTick:function(){
 							this.send("tick",0);
 							this.setTimer(1).done(function(){this.sendTick()})
 						},
 		askStatus:function(){ 
 							this.send("status",0);
 							this.setTimer(100).done(function(){this.askStatus()})
 						},
 		start:function(){
 						console.log("controller started");
 							this.askStatus();
 							this.sendTick();
 						},
 		onMessage:function(sender,message){
 			//on 
 			//console.log(sender.id,message);
 			//document.getElementById("log").innerHTML += "<pre>"+message.entityId+"</pre>";
 		}
 	}

	
	sim.addEntity(Controller)
	sim.addEntity(Vehicle);   
	
	//  do my own add vehicle..
	
	sim.simulate(SIMTIME);
	console.log("Simulation End")       // start simulation
    Park.report();  
}


function trafficLightSimulation(GREEN_TIME, MEAN_ARRIVAL, SEED, SIMTIME) {
    var sim = new Sim();
    var random = new Random(SEED);
    var trafficLights = [new Sim.Event("North-South Light"),
                         new Sim.Event("East-West Light")]; 
    var stats = new Sim.Population("Waiting at Intersection");
    
    var LightController = {
        currentLight: 0,  // the light that is turned on currently
        start: function () {
            sim.log(trafficLights[this.currentLight].name + " OFF"
                    + ", " + trafficLights[1 - this.currentLight].name + " ON");
            sim.log("------------------------------------------");
            // turn off the current light
            trafficLights[this.currentLight].clear();

            // turn on the other light.
            // Note the true parameter: the event must "sustain"
            trafficLights[1 - this.currentLight].fire(true);

            // update the currentLight variable
            this.currentLight = 1 - this.currentLight;

            // Repeat every GREEN_TIME interval
            this.setTimer(GREEN_TIME).done(this.start);
        }
    };
    
    var Traffic = {
        start: function () {
            this.generateTraffic("North", trafficLights[0]); // traffic for North -> South
            this.generateTraffic("South", trafficLights[0]); // traffic for South -> North
            this.generateTraffic("East", trafficLights[1]); // traffic for East -> West
            this.generateTraffic("West", trafficLights[1]); // traffic for West -> East
        },
        generateTraffic: function (direction, light) {
            // STATS: record that vehicle as entered the intersection
            stats.enter(this.time());
            sim.log("Arrive for " + direction);

            // wait on the light. 
            // The done() function will be called when the event fires 
            // (i.e. the light turns green).
            this.waitEvent(light).done(function () {
                var arrivedAt = this.callbackData;
                // STATS: record that vehicle has left the intersection
                stats.leave(arrivedAt, this.time());
                sim.log("Leave for " + direction + " (arrived at " + arrivedAt.toFixed(6) + ")");
            }).setData(this.time());

            // Repeat for the next car. Call this function again.
            var nextArrivalAt = random.exponential(1.0 / MEAN_ARRIVAL);
            this.setTimer(nextArrivalAt).done(this.generateTraffic, this, [direction, light]);
        }
    };
    
    sim.addEntity(LightController);
    sim.addEntity(Traffic);
   
//    Uncomment to display logging information
   sim.setLogger(function (str) {
        console.log(str);
    });
    
    // simulate for SIMTIME time
    sim.simulate(SIMTIME); 
    document.write("Number of vehicles at intersection (average) = "
        + stats.sizeSeries.average().toFixed(3)
        + " (+/- " + stats.sizeSeries.deviation().toFixed(3)
        + ")\n");
    document.write("Time spent at the intersection (average) = "
        + stats.durationSeries.average().toFixed(3)
        + " (+/- " + stats.durationSeries.deviation().toFixed(3)
        + ")\n");
    console.log(stats.durationSeries.getHistogram())
    
    return [stats.durationSeries.average(),
            stats.durationSeries.deviation(),
            stats.sizeSeries.average(),
            stats.sizeSeries.deviation()];
    
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