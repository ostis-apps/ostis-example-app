#!/bin/bash

PLATFORM_REPO="https://github.com/ostis-dev/ostis-web-platform.git"
PLATFORM_FOLDER="ostis-web-platform"

prepare_platform()
{
	cd scripts
	sudo apt-get update
	./prepare.sh
	cd ..
}

include_kb()
{
	rm ./ims.ostis.kb/ui/ui_start_sc_element.scs
	rm -rf ./kb/menu
	echo "../kb" >> ./repo.path
	echo "../problem-solver" >> ./repo.path
	echo "../interface" >> ./repo.path
	cd scripts
	./build_kb.sh
	cd ..
}

include_kpm()
{
	cd sc-machine
	echo 'add_subdirectory(${SC_MACHINE_ROOT}/../../problem-solver/cxx ${SC_MACHINE_ROOT}/build/problem-solver)' >> ./CMakeLists.txt
	cd ./scripts
	./make_all.sh
	cd ../..
}

include_interface()
{
	cd ../interface/sc-web-extensions
	npm install
	grunt build
	cd ../..
}

cd ..
if [ -d ${PLATFORM_FOLDER} ]; 
then
    echo -en "Update OSTIS platform\n"
    cd ${PLATFORM_FOLDER}
    git pull
    prepare_platform
else
    echo -en "Install OSTIS platform\n"
    git clone ${PLATFORM_REPO}
    cd ${PLATFORM_FOLDER}
    git checkout 0.5.0
    prepare_platform
    include_kb
    include_kpm
    include_interface
fi

