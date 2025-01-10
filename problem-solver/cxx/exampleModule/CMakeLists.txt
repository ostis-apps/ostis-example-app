file(GLOB SOURCES CONFIGURE_DEPENDS
        "*.cpp" "*.hpp"
        "agents/*.cpp" "agents/*.hpp"
        "keynodes/*.hpp"
        "structures/*.cpp" "structures/*.hpp"
        "searcher/*.cpp" "searcher/*.hpp"
        "utils/*.cpp" "utils/*.hpp")

add_library(exampleModule SHARED ${SOURCES})
target_link_libraries(exampleModule
    LINK_PRIVATE sc-memory
    LINK_PRIVATE sc-agents-common
)
target_include_directories(exampleModule
    PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}
)

if (${SC_BUILD_TESTS})
    include(${CMAKE_CURRENT_LIST_DIR}/test/tests.cmake)
endif ()
