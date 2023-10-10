#!/usr/bin/env bash
set -eo pipefail

ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)

export APP_ROOT_PATH="${ROOT_PATH}"
export ROOT_CMAKE_PATH="${APP_ROOT_PATH}"
export CONFIG_PATH="${APP_ROOT_PATH}/ostis-example-app.ini"
export REPO_PATH="${APP_ROOT_PATH}/repo.path"

export PLATFORM_REPO="https://github.com/ostis-ai/ostis-web-platform.git"
export PLATFORM_BRANCH="0.8.0-Fusion"
export PLATFORM_COMMIT=""
export PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"

export SC_MACHINE_REPO="https://github.com/ostis-ai/sc-machine.git"
export SC_MACHINE_BRANCH="0.8.0-Fusion"
export SC_MACHINE_COMMIT=""
export SC_MACHINE_PATH="${PLATFORM_PATH}/sc-machine"
export ROOT_CMAKE_PATH="${APP_ROOT_PATH}"

export SC_WEB_REPO="https://github.com/ostis-ai/sc-web.git"
export SC_WEB_BRANCH="0.8.0-Fusion"
export SC_WEB_COMMIT=""
export SC_WEB_PATH="${PLATFORM_PATH}/sc-web"

if [ -d "${PLATFORM_PATH}" ];
then
  source "${PLATFORM_PATH}/scripts/set_vars.sh"
fi
