set(EXAMPLE_MODULE_SRC "${PROBLEM_SOLVER_ROOT}/exampleModule")

set(HEADERS
		"keynodes/keynodes.hpp"
		"agents/SubdividingSearchAgent.hpp"
		)

set(SOURCES
		"keynodes/keynodes.cpp"
		"agents/SubdividingSearchAgent.cpp"
		)

include_directories(${EXAMPLE_MODULE_SRC} ${SC_MEMORY_SRC} ${SC_KPM_SRC})

add_library (exampleModule SHARED ${HEADERS} ${SOURCES})
target_link_libraries(exampleModule sc-memory sc-agents-common)

sc_codegen(exampleModule ${CMAKE_CURRENT_LIST_DIR})