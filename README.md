<h1 align="center">OSTIS example app</h1>

[![license](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## About

OSTIS example app is an ostis-system based on [**ostis-web-platform**](https://github.com/ostis-ai/ostis-web-platform) and designed with [OSTIS Technology](https://github.com/ostis-ai).

0.7.0 version allows communication with the knowledge base via [JSON-based Websocket protocol](http://ostis-dev.github.io/sc-machine/http/websocket/).


## Installation

For Ubuntu/Debian based distros:
```sh
git clone https://github.com/ostis-apps/ostis-example-app.git
cd ostis-example-app/scripts
./install_ostis.sh
```

## Build knowledge base

Before first launch or after changes in KB you should build knowledge base. 

```sh
cd ostis-example-app/scripts
./build_kb.sh
```

## Usage

To launch system you should start sc-server:
```sh
cd ostis-example-app/scripts
./run_sc_server.sh
```

After that launch sc-web interface:

```sh
cd ostis-example-app/scripts
./run_sc_web.sh
```

To check that everything is fine open localhost:8000 in your browser.
![](https://i.imgur.com/6SehI5s.png)

## Project Structure

### Knowledge Base

`kb` is the place for the knowledge base source text files of your app. Put your **.scs** and **.gwf** files here.

### Problem Solver

`problem-solver` is the place for the problem solver of your app. Put your agents here. After changes in problem-solver you should rebuild it:

*Use **scp_stable** branch for the development of agents on SCP.*  
*Use **0.5.0**, **0.6.0** or **0.7.0** branch for the development of agents on C++. You can see an example module with a C++ agent [here](problem-solver/cxx/exampleModule/README.md)*  

After updating your C++ code you need to rebuild `problem-solver`:  
```sh
cd ostis-example-app/scripts
./build_problem_solver.sh
```

To enable DEBUG set fields in ostis-example-app.ini:

```sh
log_type = Console
log_file = sc-memory.log
log_level = Debug
```

### Interface

`interface` is the place for your interface modules.

To learn more about creating web components for the new web interface version follow this [link](https://github.com/MikhailSadovsky/sc-machine/tree/example/web/client)

### Scripts

`scripts` is the place for scripts files of your app. There are a few scripts already:

* build_problem_solver.sh [-f, --full]

Build the problem-solver of your app. Use an argument *-f* or *--full* for a complete rebuild of the problem-solver with the deleting of the *ostis-web-platform/sc-machine/bin* and *ostis-web-platform/sc-machine/build* folders.

* install_ostis.sh

Install or update the OSTIS platform.

## Author

* GitHub: [@ostis-apps](https://github.com/ostis-apps), [@ostis-ai](https://github.com/ostis-ai)

## Show your support

Give us a ⭐️ if you've liked this project!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ostis-apps/ostis-example-app/issues). 

## 📝 License

This project is [MIT](https://opensource.org/license/mit/) licensed.
