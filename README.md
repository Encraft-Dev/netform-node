# Netform

Netform is a vehicle to grid simulator that allows underatanding of constraints, energy flows and control algorythms that effect of multiple electric vehicles in a single geographic location.



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

