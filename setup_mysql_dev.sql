-- prepares a MySQL server for the project
-- DROP DATABASE IF EXISTS hbnb_dev_db;
CREATE DATABASE IF NOT EXISTS hbnb_dev_db;
CREATE USER IF NOT EXISTS 'hbnb_dev'@'localhost' IDENTIFIED BY 'hbnb_dev_pwd';
GRANT ALL PRIVILEGES ON `hbnb_dev_db`.* TO 'hbnb_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'hbnb_dev'@'localhost';
FLUSH PRIVILEGES;
SHOW CREATE DATABASE hbnb_dev_db;
SELECT 
    user, 
    host,
    account_locked,
	password_expired,
	authentication_string
FROM
    mysql.user
WHERE
	user = 'hbnb_dev';
