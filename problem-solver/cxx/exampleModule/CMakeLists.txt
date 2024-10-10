file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (exampleModule SHARED ${SOURCES})
target_link_libraries(exampleModule sc-memory sc-agents-common)

target_include_directories(exampleModule
        PRIVATE ${CMAKE_CURRENT_LIST_DIR}
        PRIVATE ${SC_MEMORY_PATH}
        PRIVATE ${SC_AGENTS_COMMON_PATH})
