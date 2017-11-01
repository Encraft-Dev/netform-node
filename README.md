# Netform

Netform is a vehicle to grid simulator that allows underatanding of constraints, energy flows and control algorythms that effect of multiple electric vehicles in a single geographic location.

## Installation

Clone the repo and install the required node modules 
```javascript
npm install 
```
Run the application
```javascript
npm run debug
```
Navigate to
```
http://localhost:3000/sim or http://localhost:3000/ (for the app)
```
Currently enviroment variables are set up to run locally or on an openshift 2 node cartridge (hmmm) through the following lines in ```application``` 

```javascript
15 var server_port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || '3000');
16 var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
17 var server_dns_hostname = process.env.OPENSHIFT_APP_DNS || 'localhost';
```

## Simulation

The simulation engine uses a javascript simulation library from http://simjs.com. 

### configuration

The simulation itself takes a config object which is built in various ways depending on the route to call the simulation.
```javascript
{
    "simID": "local", //name of sim (live app uses current date)
    "simLength": "1440", //length of simualtion in minutes
    "simSlots": "25",  //number of parking spaces available
    "simSeed": "1234",  //random number seed for simulation random number generator
    "simDate": "2017-05-01", //required date of simulation - default today()
    "allowConstraints": true, // allow constraints
    "constraintsExportCap": "10000", //export capacity constraint
    "constraintsImportCap": "10000", //import capacity constraint
    "eventsSwitch": true,  //use events
    "eventsEFRwide": true,  //use EFR wideband
    "eventsEFRnarrow": false, //use EFR narrowband
    "allowSlowCharge": true,  // allow slow charge of vehicle when not actively controlled
    "solarCap": "200", //solar capacity installed
    "solarOut": "175800" // annual output of installed solar
}
```
### Simulation principle

The simulation is based on a facility (car park) being filled with entities (vehicles). A controller acts as a timekeeper, by broadcasting status command messages and collating replies broadcast from vehicles, and acting as an oracle for external information such solar generation, current constriants and grid signals.

Vehicles arrive at times normally distributed (randomly) around a parking profile. Each vehicle is assigned a car model and user profile (unless a live user). The user profile defines length of time the vehicle will stay and the users required charge on departure. The vehicle profile defines charging modes abd battry capacity. Each vehicle initiated with the calculation to optimise their charging in line with the whole facility.  The 'Netform' algorythm takes user requirements and constraints to calcuate the optimal charging strategy.

The simulation works on a tick basis with vehicles being polled for their state and predicted requirements every minute. The vehicles then receive the full predicted data packet from all actors and calculate their response. They then change charging rate to meet calculation. This is where the blockchain integration could be built within the call response and smart contract in the vehicle itself.

The charging response is built with a time lag (currently it takes 5 mins to adjust charging rate) and once a vehilce has reached 80% it reduces it charging rate to a lower mode.

## Front ends

The simulation will work with a number of front end as it is api based.

### Sim

The sim frontend allows user to change simulation config and also provides a graphic and navigatable visualisation of the results. Configuration can be saved and reloaded for later use.

### App

The app frontend provides a way of live users interacting with a simulation of parking and testing the customers response to various drivers including price, time and charge state at return.

## Results

Results are output to a results folder. This is not included in the git and is created on the fly as required. The result folder contains a subfolder for each unquie simID that has been run.

If the simulation is run on localhost then all data is kept, if run on a server then a minimal set of data is kept to reduce write times.

The results structure is as follows

```Results/system``` folder contains gzipped files saving the state of the simulation at each tick point.     

```Results/veh``` folder contains the state of all vehicles at each tick point. if the simulation is online then 

```Results\settings``` file contains the complete setting and profile data used  in the simulation

```Results\users``` file contains the live users added to the simulation. This will be blank is a standard simulation is carried out.


## Folders

### Results 
Generated on first run. Contains simulation results

### userData
Generated when required. Contains live userdata from app frontend. Is used to uniquely identify live users

### Data 

Contains static data files including 

* events configurations 
* parking profiles 
* Solar profiles 
* Vehicle profiles
* User Profiles.

It also contains a single status rewritable file

### Public

Public contains all the public static route html code. 

* App - Mobile app interface
* Sim - simulation frontend

### Routes

Contains all the routes for functionality, currently

* api -main simulation and associated functions
* helpers - helper functions to aid in getting data (times) in the correct format
* testuser - a testing route to add users
* user - manage live users when using live app (not used when using simulation frontend)

### Sim_modules

Simulation code and configuration

* api_functions - input, checking and setup functions for simulation
* config - base configs
* log.js - logging, file writing, folder location and saving
* sim-0.26 - simulation engine
* simulation - netform simulation code
* users - functions to deal with users, from testing and live. - parses users to simulation format

### Test

    data used for testing

### views 
     
    legacy nonesence from original scaffolding!!!! deleteing this seem to break the world..



