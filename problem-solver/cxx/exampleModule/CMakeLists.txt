set(EXAMPLE_MODULE_SRC "${PROBLEM_SOLVER_ROOT}/exampleModule")

file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

include_directories(${EXAMPLE_MODULE_SRC} ${SC_MEMORY_SRC} ${SC_KPM_SRC})

add_library (exampleModule SHARED ${SOURCES})
target_link_libraries(exampleModule sc-memory sc-agents-common)

sc_codegen(exampleModule ${CMAKE_CURRENT_LIST_DIR})
