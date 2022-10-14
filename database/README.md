# File Tree

Docker-compose --build시

1. `conf.d` 내부의 설정파일로 세팅됨
2. `initdb.d/create_table` 실행
3. `initdb.d/load_file` 실행

```
MariaDB
├── conf.d // 설정 파일 폴더
│   └── my.cnf
├── data    // DB 데이터 저장되는 폴더 (로컬)
└── initdb.d // DB 초기화 폴더
    ├── create_table.sql
    ├── initial_data
    │   ├── calculet
    │   └── profile
    └── load_data.sql
```
