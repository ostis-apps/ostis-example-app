#!/bin/bash
# Remove it after package manager implementation

./clone_subsystems.sh

cd ../ostis-web-platform/sc-machine/scripts
./make_all.sh

cd ../../scripts
./build_kb.sh


