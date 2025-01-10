file(GLOB TEST_UTILS_SOURCES CONFIGURE_DEPENDS
        "${CMAKE_CURRENT_LIST_DIR}/utils/*.cpp"
        "${CMAKE_CURRENT_LIST_DIR}/utils/*.hpp")

add_library(exampleModuleTestUtils STATIC ${TEST_UTILS_SOURCES})
target_link_libraries(exampleModuleTestUtils exampleModule sc-memory sc-agents-common gtest)

include_directories(${CMAKE_CURRENT_LIST_DIR} ${EXAMPLE_MODULE_SRC})

set(SC_BUILDER_PATH "${SC_MACHINE_PATH}/sc-tools/sc-builder/include")
set(SC_MEMORY_PATH "${SC_MACHINE_PATH}/sc-memory/sc-memory/include")

make_tests_from_folder(${CMAKE_CURRENT_LIST_DIR}/units
    NAME example_module_test_starter
    DEPENDS sc-builder-lib sc-memory sc-core exampleModule sc-agents-common exampleModuleTestUtils
    INCLUDES ${SC_MEMORY_PATH} ${SC_BUILDER_PATH} ${EXAMPLE_MODULE_SRC} ${SC_AGENTS_COMMON_SRC} ${CMAKE_CURRENT_LIST_DIR})

add_definitions(-DEXAMPLE_MODULE_TEST_SRC_PATH="${CMAKE_CURRENT_LIST_DIR}")
