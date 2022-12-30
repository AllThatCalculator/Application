# Application

AllThatCalculator Application

## production

[allthatcalculator.io](allthatcalculator.io)

## development server

[allthatcalculator.net](www.allthatcalculator.net)

---

# How to get started

## 1. clone repository

`git clone https://github.com/AllThatCalculator/application`

## 2. set ENV files

you don't have to set both env file if you want to run frontend/backend only.

- [`client/.env`](https://iewha-my.sharepoint.com/:u:/r/personal/jiyoung_06_i_ewha_ac_kr/Documents/PKB/ATC/env_file/dev/client.env?csf=1&web=1&e=xEXL7o)
- [`server/.env`](https://iewha-my.sharepoint.com/:u:/r/personal/jiyoung_06_i_ewha_ac_kr/Documents/PKB/ATC/env_file/dev/server.env?csf=1&web=1&e=0Ijrzg)

If you don't have access, use this [link](https://iewha-my.sharepoint.com/:f:/g/personal/jiyoung_06_i_ewha_ac_kr/EpJi4WzlxJpDl7Y3TQc6kScBvDjSg8kjucqMGiIqF4GWBw?e=REDyJl)

---

## 3-A. Run frontend in local environment

- Requirements
  - `node: 16.14.1`

### install package

```bash
cd client
npm install
```

### start react

```bash
cd client
npm start
```

---

## 3-B. Run backend in local environment

- Requirements
  - `docker: (20.10.XX)`

### build dockerfile

```bash
docker compose build
```

### start docker container

```bash
docker compose up
```

**note** that you should visit `localhost:8080` to test in browser, not `localhost:3000`

---

## 3-C. Run both frontend & backend in local environment

- Requirements
  - `docker: (20.10.XX)`

### build dockerfile

```bash
docker compose -f ./docker-compose.FEBE.yml build
```

### start docker container

```bash
docker compose -f ./docker-compose.FEBE.yml up
```

**note** that you should visit `localhost:8080` to test in browser, not `localhost:3000`

---
