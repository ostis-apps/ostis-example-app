#!/usr/bin/env bash
set -eo pipefail

source "$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)/set_vars.sh"

if [ -z "${PLATFORM_PATH}" ]
  then
    echo "PLATFORM_PATH is not specified, add this var to " "$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)/set_vars.sh"
    exit 1
fi

usage() {
    cat <<USAGE
Usage: $0 [update]

This script is used to download sources of ostis-web-platform and submodules
and install them. The exact behavior is configured via run arguments.

Options:
    update-platform         Remove ostis-web-platform and submodules sources and download
                            them from scratch.

    update-platform-submodules       Remove ostis-web-platform submodules sources and download
                            them from scratch.
USAGE
    exit 1
}

delete_platform() {
  rm -fr "${PLATFORM_PATH}"
}

install_platform() {
  git clone "${PLATFORM_REPO}" --branch "${PLATFORM_BRANCH}" --single-branch "${PLATFORM_PATH}" --recursive
  if [ -n "${PLATFORM_COMMIT}" ]
    then
      cd "${PLATFORM_PATH}"
      git checkout "${PLATFORM_COMMIT}"
  fi
}

update_platform=0
update_submodules=0

while [ "$1" != "" ]; do
    case $1 in
	"update-platform" )
	    update_platform=1
	    ;;
	"update-platform-submodules" )
	    update_submodules=1
	    ;;
	"--help" | "-h" | "help" )
      usage
      ;;
	* )
	    echo "unknown flag $1"
      usage
      ;;
    esac
    shift
done

install_platform=0

if [[ ! -d "${PLATFORM_PATH}" || $update_platform == 1 ]]
  then
    install_platform=1
fi

if (( install_platform ))
  then
    if (( update_platform ))
      then
        echo -e "Update ostis-web-platform"
        delete_platform
    fi

    install_platform \
      || { echo "OSTIS-web-platform wasn't installed"; exit 1; }
fi

if (( install_platform || update_submodules ))
  then
    update_flag="--update"
    echo "Install ostis-web-platform submodules"
    "${PLATFORM_PATH}/scripts/install_submodules.sh" "${update_submodules:+${update_flag}}"
  else
    echo -e "OSTIS-web-platform already exists. If you'd like to update it use one of update flags."
    exit 1
fi

(cd "${APP_ROOT_PATH}" \
  && git submodule update --init --recursive) \
  || { echo "Submodules weren't installed"; exit 1; }
