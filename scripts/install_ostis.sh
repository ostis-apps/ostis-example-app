#!/bin/bash

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"
WORKING_PATH=$(pwd)
PYTHON_PATH="${APP_ROOT_PATH}"/problem-solver/py/services
PLATFORM_REPO="https://github.com/ostis-ai/ostis-web-platform.git"

prepare_platform()
{
	cd "${PLATFORM_PATH}"/scripts
	./prepare.sh
	cd "${PLATFORM_PATH}"
}

prepare_platform_without_build()
{
	cd "${PLATFORM_PATH}"/scripts
	./prepare.sh no_build_kb no_build_sc_machine
	cd "${PLATFORM_PATH}"
}

include_kb()
{
	cd "${PLATFORM_PATH}"/scripts
	./build_kb.sh
	cd "${PLATFORM_PATH}"
}

include_problem_solver()
{
	cd "${APP_ROOT_PATH}"/scripts
	./build_problem_solver.sh
	cd "${PLATFORM_PATH}"
}

cd "${APP_ROOT_PATH}"
if [ -d "${PLATFORM_PATH}" ];
	then
		echo -en "Update OSTIS platform\n"
		cd "${PLATFORM_PATH}"
		git pull
		"${APP_ROOT_PATH}"/scripts/clone_subsystems.sh
		prepare_platform
	else
		echo -en "Install OSTIS platform\n"
		git clone ${PLATFORM_REPO}
		cd "${PLATFORM_PATH}"
		git checkout prerelease/0.7.0
		"${APP_ROOT_PATH}"/scripts/clone_subsystems.sh
		prepare_platform_without_build
		include_problem_solver
		include_kb
fi

cd "${WORKING_PATH}"
