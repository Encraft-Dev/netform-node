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
https://localhost:3000/sim
```

Currently enviroment varibles are set up to run locally or on an openshift 2 node cartridge. The follwing lines in ```application``` provide control

```javascript
15 var server_port = normalizePort(process.env.OPENSHIFT_NODEJS_PORT || '3000');
16 var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
17 var server_dns_hostname = process.env.OPENSHIFT_APP_DNS || 'localhost';
```




## Folders

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
    currently contains
        * App - Mobile app interface
        * Sim - simulation frontend

### Routes

    Contains all the routes for functionality, currently

        * api -main simulation and associated functions
        * helpers - helper functions to aid in getting data (times) in the correct format
        * testuser - a testing route to add users
        * user - manage live users when using live app (not used when using simulation frontend)

### Sim_modules

    simulation code anc configuration
        * api_functions - input, checking and setup functions for simulation
        * config - base configs
        * log.js - logging, file writing, folder location and saving
        * sim-0.26 - simulation engine
        * simulation - netform simulation code
        * users - functions to deal with users, from testing and live. - parses users to simulation format

### Test

    data used for testing

### views 
     
    legacy nonesence from original scaffolding!!!!

