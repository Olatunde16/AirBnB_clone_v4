#!/usr/bin/env bash
# Fix python scripts styling with autopep8 guidelines and pycodestyle style guide
VENV='./env/*'

if [ ! "$(command -v autopep8)" ]
then
    echo "Missing package, start installing autopep8..."
    sudo pip install pip --upgrade > /dev/null 2>&1 &&\
    sudo pip install autopep8 > /dev/null 2>&1
fi

echo "Running autopep..."
find . -type f -name '*.py' ! -path '*/migrations/*' ! -path "$VENV" -exec \
    autopep8 --in-place --aggressive --recursive --verbose '{}' \;

if [ ! "$(command -v pycodestyle)" ]
then
    echo "Missing package, start installing pycodestyle..."
    sudo apt-get update -y > /dev/null 2>&1 &&\
    sudo apt-get install autopep8 -y > /dev/null 2>&1
fi

echo -e "\n\nRunning pycodestyle..."
find . -type f -name '*.py' ! -path '*/migrations/*' ! -path "$VENV" -exec pycodestyle --verbose '{}' \;

echo -e "\nDone"
