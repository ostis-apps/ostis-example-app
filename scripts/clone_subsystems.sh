#!/bin/bash
# Remove it after package manager implementation

cd ..
if [ ! -d "./subsystems" ]
  then
    mkdir subsystems
    echo "../subsystems" >> ./ostis-web-platform/repo.path
fi

cd subsystems
rm -rf *

while IFS= read -r subsystem; do
	[[ $subsystem =~ ^#.* ]] && continue
	git clone $subsystem
done < ../subsystems.txt
