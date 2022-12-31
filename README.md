# Application

AllThatCalculator Application

## production

[allthatcalculator.io](https://allthatcalculator.io)

### system architecture
![image](https://user-images.githubusercontent.com/78730403/210069413-9730e9b7-ec36-4f42-bfa1-a3e26459e00e.png)


## development server - for alpha test

[allthatcalculator.net](http://www.allthatcalculator.net)

### system architecture
![image](https://user-images.githubusercontent.com/78730403/210069822-3df4e1f0-80f6-4659-8e91-5e226bafa8bc.png)

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
![image](https://user-images.githubusercontent.com/78730403/210070117-ad290a8e-ecbf-4e0a-b5eb-8aafe092005c.png)


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
![image](https://user-images.githubusercontent.com/78730403/210070332-1011df1d-4cae-4d1b-ac3b-4fe6a3ebdaf8.png)

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
![image](https://user-images.githubusercontent.com/78730403/210070625-7d49ea44-5966-49e3-90ae-00d0454dbbf7.png)

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
