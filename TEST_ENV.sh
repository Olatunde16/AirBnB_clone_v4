#!/usr/bin/env bash
# Setup test environment
cat setup_mysql_test.sql | mysql -h localhost -u root -p

if [ "$(printenv | grep -E 'HBNB_ENV' | awk -F'=' '{ print $1 }' )" != 'test' ]
then
	export PYTHONPATH="./";
	export HBNB_API_HOST="0.0.0.0";
	export HBNB_API_PORT="5001";
	export HBNB_ENV="test";
	export HBNB_MYSQL_USER="hbnb_test";
	export HBNB_MYSQL_PWD="hbnb_test_pwd";
	export HBNB_MYSQL_HOST="localhost";
	export HBNB_MYSQL_PORT="3306";
	export HBNB_MYSQL_DB="hbnb_test_db";
	if [ "$1" ]
	then
        export HBNB_TYPE_STORAGE="$1";
	else
        export HBNB_TYPE_STORAGE="db";
	fi
fi
