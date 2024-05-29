#!/usr/bin/env bash
set -eo pipefail

ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)

export APP_ROOT_PATH="${ROOT_PATH}"
export ROOT_CMAKE_PATH="${APP_ROOT_PATH}"
export CONFIG_PATH="${APP_ROOT_PATH}/ostis-example-app.ini"
export REPO_PATH="${APP_ROOT_PATH}/repo.path"

export PLATFORM_REPO="https://github.com/ostis-ai/ostis-web-platform.git"
export PLATFORM_BRANCH="develop"
export PLATFORM_COMMIT="07b04bf543369d40c0b8b14220d98bc4b7865f76"
export PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"

export SC_MACHINE_REPO="https://github.com/ostis-ai/sc-machine.git"
export SC_MACHINE_BRANCH="main"
export SC_MACHINE_COMMIT="2c95b984b9db3d62b07c340bf88907a10a42283c"
export SC_MACHINE_PATH="${PLATFORM_PATH}/sc-machine"
export ROOT_CMAKE_PATH="${APP_ROOT_PATH}"

export SC_WEB_REPO="https://github.com/ostis-ai/sc-web.git"
export SC_WEB_BRANCH="main"
export SC_WEB_COMMIT="c2c3532efac3865f0c840bb62f600a68f15b84da"
export SC_WEB_PATH="${PLATFORM_PATH}/sc-web"

if [ -d "${PLATFORM_PATH}" ];
then
  source "${PLATFORM_PATH}/scripts/set_vars.sh"
fi
