USE box_office_db;

DROP TABLE customers;

CREATE TABLE alternative_boxoffice(
	ID INT AUTO_INCREMENT NOT NULL,
	DataYear Int(100),
	us_netflix_subscribers VARCHAR(100),
	dvd_sales BOOLEAN Default FALSE,
	netflix_rev DECIMAL,
	Primary Key(ID)
);

LOAD DATA LOCAL INFILE '../csv/model.csv' 
INTO TABLE alternative_boxoffice 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';