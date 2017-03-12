
CREATE TABLE IF NOT EXISTS tbl_user (
	id int(11) NOT NULL AUTO_INCREMENT, 
	username varchar(50) NOT NULL, 
	pword varchar(6) NOT NULL, 
	role varchar(20), 
	PRIMARY KEY(id)
);

