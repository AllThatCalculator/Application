CREATE TABLE category_main(
    id INT NOT NULL,
	main VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE category_sub(
    id INT NOT NULL,
	sub VARCHAR(20) NOT NULL,
	main_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE calculet_info(
    id INT AUTO_INCREMENT,
	title VARCHAR(100) NOT NULL,
    src_code BLOB NOT NULL,
    manual BLOB NOT NULL,
    description VARCHAR(100) NOT NULL,
    category_main_id INT NOT NULL,
    category_sub_id INT NOT NULL,
    contributor_id VARCHAR(254) NOT NULL,
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
    category_main_id INT NOT NULL,
    category_sub_id INT NOT NULL,
    contributor_id VARCHAR(254) NOT NULL,
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
	user_id VARCHAR(254) NOT NULL,
	PRIMARY KEY (calculet_id, user_id)
);

CREATE TABLE user_info(
    id VARCHAR(254) NOT NULL,
	email VARCHAR(254) NOT NULL,
	user_name VARCHAR(20) NOT NULL,
	profile_img BLOB,
	bio VARCHAR(200),
	sex VARCHAR(1) CHECK (sex IN ('F','M')),
	birthdate DATE NOT NULL,
	job VARCHAR(25) NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE calculet_info AUTO_INCREMENT = 1;
ALTER TABLE calculet_info_temp AUTO_INCREMENT = 1;

ALTER TABLE category_sub ADD CONSTRAINT FOREIGN KEY (main_id) REFERENCES category_main(id);

ALTER TABLE calculet_info ADD CONSTRAINT FOREIGN KEY (contributor_id) REFERENCES user_info(id);
ALTER TABLE calculet_info ADD CONSTRAINT FOREIGN KEY (category_main_id) REFERENCES category_main(id);
ALTER TABLE calculet_info ADD CONSTRAINT FOREIGN KEY (category_sub_id) REFERENCES category_sub(id);

ALTER TABLE calculet_info_temp ADD CONSTRAINT FOREIGN KEY (contributor_id) REFERENCES user_info(id);
ALTER TABLE calculet_info_temp ADD CONSTRAINT FOREIGN KEY (category_main_id) REFERENCES category_main(id);
ALTER TABLE calculet_info_temp ADD CONSTRAINT FOREIGN KEY (category_sub_id) REFERENCES category_sub(id);

ALTER TABLE calculet_update_log ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE calculet_count ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE calculet_statistics ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);

ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES user_info(id);

--caculet_info에 insert하면 calculet_statistics도 insert되는 트래거
CREATE TRIGGER calculet_statistics_insert AFTER INSERT ON calculet_info 
FOR EACH ROW
INSERT INTO calculet_statistics(calculet_id) VALUES(new.id);

--caculet_info에 insert하면 calculet_count도 insert되는 트래거
CREATE TRIGGER calculet_count_insert AFTER INSERT ON calculet_info 
FOR EACH ROW
INSERT INTO calculet_count(calculet_id) VALUES(new.id);