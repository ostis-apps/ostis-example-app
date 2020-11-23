#!/bin/bash
# Remove this script after package manager implementation

APP_ROOT_PATH=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && cd .. && pwd)
PLATFORM_PATH="${APP_ROOT_PATH}/ostis-web-platform"
WORKING_PATH=$(pwd)

cd "${APP_ROOT_PATH}"
if [ ! -d "./subsystems" ]
	then
		mkdir subsystems
		echo "../subsystems" >> "${PLATFORM_PATH}"/repo.path
fi

cd subsystems
rm -rf *

while IFS= read -r subsystem; do
	[[ $subsystem =~ ^#.* ]] && continue
	git clone $subsystem
done < "${APP_ROOT_PATH}"/subsystems.txt

cd "${WORKING_PATH}"
