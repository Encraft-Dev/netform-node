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

var profile_solar = [{"Month":"Jan","Monthly":"0.0354","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0.064068077,"10":0.092915991,"11":0.212233519,"12":0.196646004,"13":0.229938815,"14":0.192548163,"15":0.011649432,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Feb","Monthly":"0.0503","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0.046694726,"9":0.092268342,"10":0.149814906,"11":0.165876898,"12":0.157485316,"13":0.157492221,"14":0.110662228,"15":0.088401212,"16":0.031304151,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Mar","Monthly":"0.0773","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0.013966019,"8":0.05166014,"9":0.097091261,"10":0.125849172,"11":0.136194753,"12":0.131487814,"13":0.157986101,"14":0.137808702,"15":0.096804347,"16":0.045356822,"17":0.005794868,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Apr","Monthly":"0.1433","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0.011253642,"7":0.043719514,"8":0.076091653,"9":0.10300415,"10":0.123309664,"11":0.124231919,"12":0.130266832,"13":0.12857654,"14":0.109335553,"15":0.082378465,"16":0.050942129,"17":0.016707096,"18":0.000182844,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"May","Monthly":"0.1103","0":0,"1":0,"2":0,"3":0,"4":0,"5":0.004940308,"6":0.022003282,"7":0.048902526,"8":0.068292232,"9":0.089039636,"10":0.104397826,"11":0.089205327,"12":0.123389082,"13":0.145091391,"14":0.125503438,"15":0.090791631,"16":0.056612744,"17":0.024276884,"18":0.007553693,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Jun","Monthly":"0.1278","0":0,"1":0,"2":0,"3":0,"4":0.000381152,"5":0.005896372,"6":0.023384261,"7":0.049930364,"8":0.075575409,"9":0.096000094,"10":0.10675223,"11":0.107025467,"12":0.115390554,"13":0.116317703,"14":0.110219145,"15":0.087521907,"16":0.06494539,"17":0.032418538,"18":0.007002369,"19":0.001239044,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Jul","Monthly":"0.1316","0":0,"1":0,"2":0,"3":0,"4":0.000229107,"5":0.008051807,"6":0.02772535,"7":0.056117136,"8":0.084036023,"9":0.105129824,"10":0.115468623,"11":0.121941366,"12":0.11202105,"13":0.097126511,"14":0.087268293,"15":0.079919773,"16":0.0615054,"17":0.033411102,"18":0.008357457,"19":0.001691177,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Aug","Monthly":"0.0841","0":0,"1":0,"2":0,"3":0,"4":0,"5":0.000596849,"6":0.017892126,"7":0.047103209,"8":0.072945741,"9":0.101595055,"10":0.125781281,"11":0.129451702,"12":0.127378704,"13":0.118011659,"14":0.09692381,"15":0.083802592,"16":0.053885601,"17":0.022477991,"18":0.00215368,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Sep","Monthly":"0.0881","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0.006248384,"7":0.038510769,"8":0.071630084,"9":0.103186234,"10":0.11123175,"11":0.127436295,"12":0.116465395,"13":0.149822782,"14":0.121981753,"15":0.091594219,"16":0.053397275,"17":0.008495059,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Oct","Monthly":"0.0843","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0.031947506,"8":0.078490079,"9":0.119443016,"10":0.140353416,"11":0.154350837,"12":0.150107218,"13":0.135167479,"14":0.109489145,"15":0.060675226,"16":0.019976077,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Nov","Monthly":"0.0358","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0.073793957,"9":0.142701576,"10":0.169688887,"11":0.172153323,"12":0.107461306,"13":0.202986087,"14":0.12404262,"15":0.007172243,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},
					{"Month":"Dec","Monthly":"0.0316","0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0.088807232,"10":0.182649371,"11":0.184297044,"12":0.214559858,"13":0.193870724,"14":0.135815771,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0}]

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
// 	
//MCS data api
//
var API_MCS24 = {location:{postcode:{definition:"",message:"",value:""},irradiance_region:{definition:"",message:"",value:0},zone_number:{definition:"",message:"",value:0}},panels:[{id:{definition:"",message:"",value:""},manufacturer:{definition:"",message:"",value:""},model:{definition:"",message:"",value:""},panel_count:{definition:"",message:"",value:0},electrical_rating:{definition:"",message:"",value:0},installed_capacity:{definition:"",message:"",value:0},area_required:{definition:"",message:"",value:0},area_available:{definition:"",message:"",value:0},pitch:{definition:"",message:"",value:30},orientation:{definition:"System uses azimuth, not value. Use value to store the acutal orientation but complete azimuth for calculations.",message:"",value:0,rounded_value:0,azimuth:0},annual_electrical_output:{definition:"",message:"",value:0},irradiance:{definition:"",message:"",value:0},shade:{number_of_segments:{definition:"",message:"",value:0},horizon:{definition:"",message:"",value:[]},factor:{definition:"",message:"",value:0}}}],annual_electrical_output:{definition:"",message:"",value:0},installed_capacity:{definition:"",message:"",value:0},irradiance:{definition:"",message:"",value:0},system:{lifespan:{definition:"",message:"",value:25}}};
