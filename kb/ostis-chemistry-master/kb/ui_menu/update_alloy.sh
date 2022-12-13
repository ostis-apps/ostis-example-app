#!/bin/bash

red="\e[1;31m"  # Red B
blue="\e[1;34m" # Blue B
green="\e[0;32m"

bwhite="\e[47m" # white background
rst="\e[0m"     # Text reset

st=$1


stage()
{
    let "st += 1"
    echo -en $green"[$st]$rst" $blue"$1...\n"$rst
}

base_path=src
sc_web_path=../../sc-web/client
sc_web_static_path=$sc_web_path/static

stage "Build component"

cd $base_path
python build_components.py -a -i
cd -

append_line()
{
    if grep -Fxq "$3" $1
    then
        # code if found
        echo -en "Link to " $blue"$2"$rst "already exists in " $blue"$1"$rst "\n"
    else
        # code if not found
        echo -en "Append '" $green"$2"$rst "' -> " $green"$1"$rst "\n"
        echo $3 >> $1
    fi
}

append_js()
{
    append_line $1 $2 "<script type=\"text/javascript\" charset=\"utf-8\" src=\"/static/$2\"></script>"
}

append_css()
{
    append_line $1 $2 "<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/$2\" />"
}

stage "Copy component"

cp -Rfv $base_path/components/alloy/static/* $sc_web_static_path

stage "Install component"

append_js $sc_web_path/templates/components.html components/js/chemistry_components/alloy_ui_component.js

cd $sc_web_path/../scripts
./install_deps_ubuntu.sh
./prepare_js.sh
python build_components.py -i -a