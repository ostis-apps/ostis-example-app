#!/bin/bash
# Remove this script after package manager implementation

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"
WORKING_PATH=$(pwd)

cd "${APP_ROOT_PATH}"/scripts
./clone_subsystems.sh

./build_problem_solver.sh

cd "${PLATFORM_PATH}"/scripts
./build_kb.sh

cd "${WORKING_PATH}"
