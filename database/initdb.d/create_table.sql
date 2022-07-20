CREATE TABLE calculet_info(
    id INT AUTO_INCREMENT,
	 title CHAR(100) NOT NULL,
    src_code BLOB NOT NULL,
    manual BLOB NOT NULL,
    description CHAR(100) NOT NULL,
    category_main CHAR(20) NOT NULL,
    category_sub CHAR(20) NOT NULL,
    contributor_id CHAR(15) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE calculet_statistics(
    calculet_id INT NOT NULL,
		like_cnt INT DEFAULT 0,
    bookmark_cnt INT DEFAULT 0,
    report_cnt INT DEFAULT 0,
    view_cnt INT DEFAULT 0,
		PRIMARY KEY (calculet_id)
);

CREATE TABLE user_calculet(
    liked BOOLEAN,
		bookmarked BOOLEAN,
		calculet_id INT NOT NULL,
		user_id CHAR(15) NOT NULL,
		PRIMARY KEY (calculet_id, user_id)
);

CREATE TABLE user_login(
    user_id CHAR(15) NOT NULL,
		pw CHAR(255) NOT NULL,
		PRIMARY KEY (user_id)
);

CREATE TABLE user_info(
		id CHAR(15) NOT NULL,
		email CHAR(254) NOT NULL,
		user_name CHAR(20) NOT NULL,
		profile_img BLOB,
		bio CHAR(200),
		sex CHAR(1) CHECK (sex IN ('F','M')),
		birthdate DATE NOT NULL,
		job CHAR(25) NOT NULL,
		PRIMARY KEY (id)
);

ALTER TABLE calculet_info AUTO_INCREMENT = 1;
ALTER TABLE calculet_info ADD CONSTRAINT FOREIGN KEY (contributor_id) REFERENCES user_info(id);
ALTER TABLE calculet_statistics ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (calculet_id) REFERENCES calculet_info(id);
ALTER TABLE user_calculet ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES user_info(id);
ALTER TABLE user_login ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES user_info(id);

CREATE TRIGGER after_calculet_info_insert AFTER INSERT ON calculet_info 
FOR EACH ROW
INSERT INTO calculet_statistics(calculet_id) VALUES(new.id);