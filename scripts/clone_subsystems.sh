#!/bin/bash
# Remove it after package manager implementation

cd ..
if [ ! -d "./subsystems" ]
  then
    mkdir subsystems
    echo "../subsystems" >> ./ostis/repo.path
fi

cd subsystems
rm -rf *

while IFS= read -r subsystem; do
    git clone $subsystem
done < ../subsystems.txt
