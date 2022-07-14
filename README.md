# Application

AllThatCalculator Application

# How to get started

0. `git clone https://github.com/AllThatCalculator/application`

### DB setting

1. `mkdir application/database/data`

### install packages

2. application/client | `npm install`
3. application/server | `npm install`

### with Docker-compose

4. `docker-compose up --build`

### without Docker

5. application/client | `npm start`
6. application/server | `npx nodemon main.js`
7. install MariaDB and execute `database/initdb.d/create_table.sql` and `database/initdb.d/load_data.sql`

# File tree

```
APPLICATION
├── client      // frontend
│   ├── build
│   │   ├── img
│   │   └── static
│   ├── public
│   │   └── img
│   └── src
│       ├── calculets   // 계산기 모듈 저장
│       ├── components
│       ├── css
│       └── pages
├── database
│   ├── conf.d
│   ├── (data)  // 로컬에 저장되는 파일 목록
│   └── initdb.d
│       └── initial-data
├── nginx
└── server      // backend
    ├── config
    └── routes
```
