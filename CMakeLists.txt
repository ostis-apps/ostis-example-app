project (ostis-example-app)
cmake_minimum_required (VERSION 2.8)

set(SC_MACHINE_PATH "${CMAKE_CURRENT_LIST_DIR}/ostis-web-platform/sc-machine")
include("${SC_MACHINE_PATH}/CMakeLists.txt")

# platform doesn't support multi-extensions. Have to put project binaries to sc-machine extensions
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin/extensions")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_LIST_DIR}/bin")

# for multi-config builds (e.g. msvc)
foreach(OUTPUT_CONFIG ${CMAKE_CONFIGURATION_TYPES})
    string(TOUPPER ${OUTPUT_CONFIG} output_required_filesUT_CONFIG)
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_${OUTPUT_CONFIG} ${SC_EXTENSIONS_DIRECTORY})
    set(CMAKE_LIBRARY_OUTPUT_DIRECTORY_${OUTPUT_CONFIG} ${SC_EXTENSIONS_DIRECTORY})
endforeach(OUTPUT_CONFIG CMAKE_CONFIGURATION_TYPES)

set(CMAKE_SCRIPTS_FOLDER "${CMAKE_CURRENT_LIST_DIR}/cmake")
include(${CMAKE_SCRIPTS_FOLDER}/common.cmake)

set(SUBSYSTEMS_PATH "${CMAKE_CURRENT_LIST_DIR}/subsystems")
set(SCL_MACHINE_PS_PATH "${SUBSYSTEMS_PATH}/scl-machine/problem-solver")
set(INFERENCE_MODULE_PATH "${SCL_MACHINE_PS_PATH}/cxx/inferenceModule")

add_subdirectory(${SCL_MACHINE_PS_PATH}/)

add_subdirectory(problem-solver)

