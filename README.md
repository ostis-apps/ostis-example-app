## Version 0.6.1

This version allows communication with the knowledge base via [JSON-based Websocket protocol](http://ostis-dev.github.io/sc-machine/http/websocket/).

New version of web interface implements to show usage of **sc-server** (runner of two-side JSON protocol).?
The new version of web interface communicates with **sc-server** using two-way JSON protocol.

You can still use [sctp protocol](http://ostis-dev.github.io/sc-machine/net/sctp/) with this version of web interface as well.

## Install

Linux:
```sh
git clone https://github.com/SHtress/ostis-example-app
cd ostis-example-app/scripts
git checkout 0.6.1
./install_ostis.sh
```

## Build knowledge base
Linux:
```sh
cd {project-name}/ostis-web-platform/scripts
./build_kb.sh
```

## Run
Please note that JSON Websocket protocol will be available as well after start.

WARNING: Both terminals run at the same time.

Run on Linux:
```sh
#Terminal 1
cd {project-name}/ostis-web-platform/scripts
./run_sctp.sh

#Terminal 2
cd {project-name}/ostis-web-platform/scripts
./run_scweb.sh
```

Then open localhost:8000 in your browser.
![](https://i.imgur.com/6SehI5s.png)

WARNING: don't forget to kill sctp process after finishing your work

## Project Structure

### kb
The place for the knowledge base of your app. Put your **.scs** files here.

### problem-solver
The place for the problem solver of your app. Put your agents here.

*Use **scp_stable** branch for the development of agents on SCP.*  
*Use **0.5.0** or **0.6.0** branch for the development of agents on C++.*  
*Use **0.6.0** branch for the development of agents on Python.*  

#### Agents on C++
Some tips:
- Store your modules with C++ agents in *problem-solver/cxx*;
- After updating your C++ code you need to rebuild problem-solver. Just run:  
```
cd {project-name}/scripts
./build_problem_solver.sh
```
For a full rebuild with the deleting of the *bin* and *build* folders run:
```
cd patient-care/scripts
./build_problem_solver.sh -f
```

- To enable debug:
    * add *SET(CMAKE_BUILD_TYPE Debug)* line 
    to *{project-name}/CMakeLists.txt* file;
    * rebuild problem-solver.
- You can see an example module with a C++ agent [here](problem-solver/cxx/exampleModule/README.md).

#### Agents on Python
Some tips:
- Store your modules with Python agents in *problem-solver/py*;
- After updating your Python code you don't need to rebuild problem-solver;
- You can see example modules using Python [here](problem-solver/py). 

### interface

The place for your interface modules.

To learn more about creating web components for the new web interface version please follow this [link](https://github.com/MikhailSadovsky/sc-machine/tree/example/web/client)

#### sc-web-extensions
The place for your extensions using **IMS interface(sc-web)** standard. 

*Your extensions are not applied to sc-web automatically for now, but you can do it by hand.*

### scripts
The place for scripts of your app.

#### build_problem_solver.sh [-f, --full]
Build the problem-solver of your app. Use an argument *-f* or *--full* for a complete rebuild of the problem-solver with the deleting of the *ostis-web-platform/sc-machine/bin* and *ostis-web-platform/sc-machine/build* folders.

#### install_ostis.sh
Install or update the OSTIS platform.

#### install_subsystems.sh
Building a problem solver and a knowledge base of subsystems.
