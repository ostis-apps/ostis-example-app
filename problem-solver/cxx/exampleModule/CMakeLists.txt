file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library(exampleModule SHARED ${SOURCES})
target_link_libraries(exampleModule
    LINK_PRIVATE sc-memory
    LINK_PRIVATE sc-agents-common
)
target_include_directories(exampleModule
    PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}
)
