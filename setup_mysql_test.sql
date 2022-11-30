-- prepares a MySQL server for the project
-- DROP DATABASE IF EXISTS hbnb_test_db;
CREATE DATABASE IF NOT EXISTS hbnb_test_db;
CREATE USER IF NOT EXISTS 'hbnb_test'@'localhost' IDENTIFIED BY 'hbnb_test_pwd';
GRANT ALL PRIVILEGES ON `hbnb_test_db`.* TO 'hbnb_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'hbnb_test'@'localhost';
FLUSH PRIVILEGES;
SHOW CREATE DATABASE hbnb_test_db;
SELECT 
    user, 
    host,
    account_locked,
	password_expired,
	authentication_string,
FROM
    mysql.user
WHERE
	user = 'hbnb_test';
