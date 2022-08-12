INSERT INTO user_info VALUES('allthatcalculator@gmail.com', 'allthatcalculator', LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/profile/atc.png'), NULL, 'F', '2022-04-02', '관리자');
INSERT INTO user_info VALUES('bsa0322@ewhain.net', 'bsa0322', LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/profile/bsa0322.png'), NULL, 'F', '2002-03-22', '학생');

INSERT INTO user_login(user_email, pw) VALUES('bsa0322@ewhain.net', 'password');

INSERT INTO category_main VALUES(0, '단위 변환기');
INSERT INTO category_main VALUES(1, '수학');
INSERT INTO category_main VALUES(2, '과학-공학');
INSERT INTO category_main VALUES(3, '경제-사회');
INSERT INTO category_main VALUES(4, '일상');
INSERT INTO category_main VALUES(5, '기타');
INSERT INTO category_main VALUES(99999, '');

INSERT INTO category_sub VALUES(0, '단위 변환기', 0);
INSERT INTO category_sub VALUES(1, '계산',1);
INSERT INTO category_sub VALUES(2, '통계',1);
INSERT INTO category_sub VALUES(3, '기하',1);
INSERT INTO category_sub VALUES(4, '과학',2);
INSERT INTO category_sub VALUES(5, '공학',2);
INSERT INTO category_sub VALUES(6, '경제',3);
INSERT INTO category_sub VALUES(7, '시간&날짜',4);
INSERT INTO category_sub VALUES(8, '운동',4);
INSERT INTO category_sub VALUES(9, '쇼핑',4);
INSERT INTO category_sub VALUES(10,'학교',4);
INSERT INTO category_sub VALUES(99999, '기타', 99999);

INSERT INTO calculet_info(title, src_code, manual, description, category_main_id, category_sub_id, contributor_email) VALUES('사칙연산 계산기',LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/calculet/arithmeticOperation.html'),LOAD_FILE('/docker-entrypoint-initdb.d/initial-data/calculet/arithmeticOperation.md'),'사칙연산을 하는 계산기입니다.',1,1,'bsa0322@ewhain.net');