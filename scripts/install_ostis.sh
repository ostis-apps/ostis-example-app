#!/bin/bash

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"
WORKING_PATH=$(pwd)
PLATFORM_REPO="https://github.com/ostis-ai/ostis-web-platform.git"

prepare_platform()
{
	cd "${PLATFORM_PATH}"/scripts
	./prepare.sh
}

prepare_platform_without_build()
{
	cd "${PLATFORM_PATH}"/scripts
	./prepare.sh no_build_kb 
}

include_kb()
{
	cd "${APP_ROOT_PATH}"/scripts
	./build_kb.sh
}

include_problem_solver()
{
	cd "${APP_ROOT_PATH}"/scripts
	./build_problem_solver.sh
}

cd "${APP_ROOT_PATH}"
if [ -d "${PLATFORM_PATH}" ];
	then
		echo -en "Update OSTIS platform\n"
		cd "${PLATFORM_PATH}"
		git pull
		prepare_platform
	else
		echo -en "Install OSTIS platform\n"
		git clone ${PLATFORM_REPO}
		cd "${PLATFORM_PATH}"
		git checkout 0.7.0-Rebirth
		prepare_platform_without_build
		include_problem_solver
		include_kb
fi

cd "${WORKING_PATH}"
