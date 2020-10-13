## Version 0.6.0

This version allows usage of [JSON-based Websocket protocol](http://ostis-dev.github.io/sc-machine/http/websocket/) to communicate with knowledge base.

New version of web interface implemented to show usage of **sc-server** (runner of two-side JSON protocol).

You can still use [sctp protocol](http://ostis-dev.github.io/sc-machine/net/sctp/) with sc-web version of web interface in parallel.

## Installation

Linux:
```sh
git clone https://github.com/ostis-apps/ostis-example-app.git
git checkout 0.6.0
cd {project-name}/scripts
./install_ostis.sh
```

## Build knowledge base
Linux:
```sh
cd {project-name}/ostis/scripts
./build_kb.sh
```

## Run

There are 2 possible options to run:
### Option 1. Run sc-server 
Run on Linux:
```sh
cd {project-name}/ostis/scripts
./run_sc_server.sh
```

Then open localhost:8090 in your browser
![](https://i.imgur.com/wibISSV.png)
Current interface version allows node creation with system identifier and search main identifier by given system identifier. Functionality can be extended.
### Option 2. Run sctp-server & sc-web
Please note that JSON Websocket protocol will be available as well after run.
Run on Linux:
```sh
#Terminal 1
cd {project-name}/ostis/scripts
./run_sctp.sh

#Terminal 2
cd {project-name}/ostis/scripts
./run_scweb.sh
```

Then open localhost:8000 in your browser.
![](https://i.imgur.com/6SehI5s.png)
*Please note that search field functionalities are limited. You can do a search by english identifier only. Search identifiers hint results shown by interface not consistentent with knowledge base in current version*

You can open localhost:8090 in your browser as well to see new web interface version.

## Project Structure

### kb
Place for knowledge base of your app. Put your **.scs** and **.gwf** files here.

### problem-solver
Place for problem solver of your app. Put your agents here.

*Use **scp_stable** branch for development of agents on SCP.*  
*Use **0.5.0** or **0.6.0** branch for development of agents on C++.*  
*Use **0.6.0** branch for development of agents on python.*  

#### Agents on C++
Some tips:
- Store your modules with c++ agents in *problem-solver/cxx*;
- After update c++ code you need to rebuild sc-machine. Just run:  
```
cd {project-name}/ostis/sc-machine/scripts
./make_all.sh
```
- For enable debug:
    * add *SET(CMAKE_BUILD_TYPE Debug)* line 
    to *{project-name}/ostis/sc-machine/CMakeLists.txt* file;
    * rebuild sc-machine.
- Look example module with C++ agent [here](problem-solver/cxx/exampleModule/README.md).

#### Agents on Python
Some tips:
- Store your modules with python agents in *problem-solver/py*;
- After update python code you don't need to rebuild sc-machine;
- Look example modules using python [here](problem-solver/py). 

### interface

Place for your interface modules.

To learn more about web components creation for new web interface version please follow this [link](https://github.com/MikhailSadovsky/sc-machine/tree/example/web/client)

#### sc-web-extensions
Place for your extensions of standard **IMS interface(sc-web)**. 

*We don't have automatically applying of your extensions to sc-web now. Do it by hand.*
