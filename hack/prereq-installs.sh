#!/usr/bin/env bash

sudo apt get update -y
sudo apt get upgrade -y
sudo apt-get install -y python3-lxml
sudo pip install sqlalchemy
sudo pip3 install flask
sudo pip3 install flask_cors # if it was not installed yet
sudo pip3 install flasgger
sudo pip3 uninstall -y jsonschema
sudo pip3 install jsonschema==3.0.1
sudo pip3 install pathlib2
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install semistandard --global
sudo service mysql start
cat 100-dump.sql | mysql -uroot -proot
cat setup_mysql_dev.sql | mysql -uroot -proot
cat setup_mysql_test.sql | mysql -uroot -proot
