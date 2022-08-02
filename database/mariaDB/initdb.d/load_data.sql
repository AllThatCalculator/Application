INSERT INTO user_info VALUES('allthatcalculator@gmail.com', 'allthatcalculator', LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/profile/atc.png'), NULL, 'F', '2022-04-02', '관리자');
INSERT INTO user_info VALUES('bsa0322@ewhain.net', 'bsa0322', LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/profile/bsa0322.png'), NULL, 'F', '2002-03-22', '학생');

INSERT INTO user_login VALUES('bsa0322@ewhain.net', 'password');
INSERT INTO calculet_info(title, src_code, manual, description, category_main, category_sub, contributor_email) VALUES('사칙연산 계산기',LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/calculet/arithmeticOperation.html'),LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/calculet/arithmeticOperation.md'),'사칙연산을 하는 계산기입니다.','수학','계산','bsa0322@ewhain.net');