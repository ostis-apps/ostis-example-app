#!/bin/bash

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH=${APP_ROOT_PATH}/ostis-web-platform
WORKING_PATH=$(pwd)

set -e -o pipefail
python3 "${PLATFORM_PATH}"/sc-machine/scripts/build_kb.py "${APP_ROOT_PATH}/repo$1.path" -c "${APP_ROOT_PATH}/ostis-example-app.ini" -b "${APP_ROOT_PATH}"/bin
