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