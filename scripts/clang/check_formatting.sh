#!/usr/bin/env bash
set -eo pipefail

if [ -z "${BUILD_PATH}" ];
then
  source "$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)/.."/set_vars.sh
fi

cmake -B "${BUILD_PATH}" -DSC_CLANG_FORMAT_CODE=ON
cmake --build "${BUILD_PATH}" --target clangformat_check
