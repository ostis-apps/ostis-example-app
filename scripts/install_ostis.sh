#!/bin/bash

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"
WORKING_PATH=$(pwd)
PLATFORM_REPO="https://github.com/ostis-dev/ostis-web-platform.git"

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
	cd "${PLATFORM_PATH}"
	rm ./ims.ostis.kb/ui/ui_start_sc_element.scs
	rm -rf ./kb/menu
	echo "../kb" >> ./repo.path
	echo "../problem-solver" >> ./repo.path
	cd scripts
	./build_kb.sh
	cd "${PLATFORM_PATH}"
}

include_kpm()
{
	cd "${PLATFORM_PATH}"/sc-machine
	sed -i '\|build/problem-solver/cxx|d' ./CMakeLists.txt
	sed -i '\|build/problem-solver/py|d' ./CMakeLists.txt
	cat "${APP_ROOT_PATH}"/scripts/sc_machine_cmake_file_ext.txt >> ./CMakeLists.txt
	
	cd config
	sed -i '/python/d' ./config.ini.in
	sed -i '/modules_path/d' ./config.ini.in 
	echo -e '[python]' >> ./config.ini.in
	echo 'modules_path = ${SC_MACHINE_ROOT}/sc-kpm/sc-python/services;${SC_MACHINE_ROOT}/../../problem-solver/py/services' >> ./config.ini.in

	cd ../scripts
	./make_all.sh
	cat "${PLATFORM_PATH}"/bin/config.ini >> "${PLATFORM_PATH}"/config/sc-web.ini
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
		git checkout 0.6.0
		"${APP_ROOT_PATH}"/scripts/clone_subsystems.sh
		prepare_platform_without_build
		include_kpm
		include_kb
fi

cd "${WORKING_PATH}"
