#!/usr/bin/env bash
set -eo pipefail

if [ -z "${APP_ROOT_PATH}" ];
then
  source "$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)"/set_vars.sh
fi

"${APP_ROOT_PATH}/scripts/install_submodules.sh"
"${PLATFORM_PATH}/scripts/install_dependencies.sh" --dev
"${APP_ROOT_PATH}/scripts/build_problem_solver.sh"
"${APP_ROOT_PATH}/scripts/build_sc_web.sh"
"${APP_ROOT_PATH}/scripts/build_kb.sh"
