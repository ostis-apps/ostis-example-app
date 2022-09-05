## Version 0.7.0

This version allows communication with the knowledge base via [JSON-based Websocket protocol](http://ostis-dev.github.io/sc-machine/http/websocket/).

The new version of web interface communicates with **sc-server** using two-way JSON protocol.

## Install

Linux:
```sh
git clone https://github.com/ostis-apps/ostis-example-app.git
cd ostis-example-app/scripts
git checkout 0.7.0
./install_ostis.sh
```

## Build knowledge base
Linux:
```sh
cd ostis-example-app/scripts
./build_kb.sh
```

## Run

Run on Linux (both terminals or terminal tabs should work at the same time):
```sh
#Terminal 1
cd ostis-example-app/scripts
./run_sc_server.sh

#Terminal 2
cd ostis-example-app/scripts
./run_scweb.sh
```

Then open localhost:8000 in your browser.
![](https://i.imgur.com/6SehI5s.png)

## Project Structure

### kb
The place for the knowledge base of your app. Put your **.scs** files here.

### problem-solver
The place for the problem solver of your app. Put your agents here.

*Use **scp_stable** branch for the development of agents on SCP.*  
*Use **0.5.0**, **0.6.0** or **0.7.0** branch for the development of agents on C++.*  


#### Agents on C++
Some tips:
- Store your modules with C++ agents in *problem-solver/cxx*;
- After updating your C++ code you need to rebuild problem-solver. Just run:  
```
cd ostis-example-app/scripts
./build_problem_solver.sh
```

- To enable debug set vars in ostis-example-app.ini:
    ```sh
    log_type = Console
    log_file = sc-memory.log
    log_level = Debug
    ```
- You can see an example module with a C++ agent [here](problem-solver/cxx/exampleModule/README.md).

### Interface

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
