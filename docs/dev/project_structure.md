# Project Structure

## kb
Place for the knowledge base of your app. Put your *.scs* files here.

## problem-solver
Place for the problem solver of your app. Put your agents here.

### Agents on C++
Some tips:

- Store your modules with c++ agents in *problem-solver/cxx*;

- After update c++ code you need to rebuild problem-solver. Just run:
```
./scripts/build_problem_solver.sh
```
For a full rebuild with the deleting of the *bin* and *build* folders run:
```
./scripts/build_problem_solver.sh -f
```

- For enable debug:

    * add *SET(CMAKE_BUILD_TYPE Debug)* line 
    to *ostis-example-app/CMakeLists.txt* file;
    * rebuild problem-solver.

### Logging
You can change the logging level by changing the value of a variable _log_level_. This variable is located in *ostis-example-app.ini*
Mind that this config is for runtime, it is not connected with tests.

## scripts
Place for scripts of your app.

### build_problem_solver.sh [-f, --full]
Build the problem-solver of your app. Use an argument *-f* or *--full* for a complete rebuild of the problem-solver with the deleting of the *bin* and *build* folders.

## configuration
Project configuration is situated in `ostis-example-app.ini` file.
