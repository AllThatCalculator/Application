# Application

AllThatCalculator Application

# How to get started

0. `git clone https://github.com/AllThatCalculator/application`

### DB setting

1. `mkdir application/database/data`

### with Docker-compose

2. `docker-compose up --build`

### without Docker

2. application/client | `npm install`
3. application/client | `npm start`
4. application/server | `npm install`
5. application/server | `npx nodemon install`
6. install MariaDB

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
│       └── initial_data
├── nginx
└── server      // backend
    ├── config
    └── routes
```
