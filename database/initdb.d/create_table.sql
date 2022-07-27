CREATE TABLE calculet_info(
    id INT AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
    src_code BLOB NOT NULL,
    manual BLOB NOT NULL,
    description VARCHAR(100) NOT NULL,
    category_main VARCHAR(20) NOT NULL,
    category_sub VARCHAR(20) NOT NULL,
    contributor_email VARCHAR(254) NOT NULL,
	birthday DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	blocked BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE calculet_info_temp(
    id INT AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
    src_code BLOB NOT NULL,
    manual BLOB NOT NULL,
    description VARCHAR(100) NOT NULL,
    category_main VARCHAR(20) NOT NULL,
    category_sub VARCHAR(20) NOT NULL,
    contributor_email VARCHAR(254) NOT NULL,
	birthday DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE calculet_update_log(
	update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message VARCHAR(100) NOT NULL,
    calculet_id INT NOT NULL,
    PRIMARY KEY (calculet_id, update_date)
);

CREATE TABLE calculet_count(
    calculet_id INT NOT NULL,
	view_cnt INT DEFAULT 0,
    calculation_cnt INT DEFAULT 0,
    user_cnt INT DEFAULT 0,
	PRIMARY KEY (calculet_id)
);

CREATE TABLE calculet_statistics(
    calculet_id INT NOT NULL,
	like_cnt INT DEFAULT 0,
    bookmark_cnt INT DEFAULT 0,
    report_cnt INT DEFAULT 0,
	PRIMARY KEY (calculet_id)
);

CREATE TABLE user_calculet(
    liked BOOLEAN,
	bookmarked BOOLEAN,
	calculet_id INT NOT NULL,
	user_email VARCHAR(254) NOT NULL,
	PRIMARY KEY (calculet_id, user_email)
);

CREATE TABLE user_login(
    user_email VARCHAR(254) NOT NULL,
	pw VARCHAR(300) NOT NULL,
	PRIMARY KEY (user_email)
);

CREATE TABLE user_info(
	email VARCHAR(254) NOT NULL,
	user_name VARCHAR(20) NOT NULL,
	profile_img BLOB,
	bio VARCHAR(200),
	sex VARCHAR(1) CHECK (sex IN ('F','M')),
	birthdate DATE NOT NULL,
	job VARCHAR(25) NOT NULL,
	PRIMARY KEY (email)
);

ALTER TABLE calculet_info AUTO_INCREMENT = 1;
ALTER TABLE calculet_info ADD CONSTRAINT FOREIGN KEY (contributor_email) REFERENCES user_info(email);
ALTER TABLE calculet_info_temp ADD CONSTRAINT FOREIGN KEY (contributor_email) REFERENCES user_info(email);
ALTER TABLE calculet_update_log ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE calculet_count ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE calculet_statistics ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (user_email) REFERENCES user_info(email);
ALTER TABLE user_login ADD CONSTRAINT FOREIGN KEY (user_email) REFERENCES user_info(email);