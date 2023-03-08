# Application

AllThatCalculator Application

## production

[allthatcalculator.io](https://allthatcalculator.io)

### system architecture

![image](https://user-images.githubusercontent.com/78730403/210151266-8e113d99-20c5-49c4-bfec-c165e163a7de.png)

## development server - for alpha test

[allthatcalculator.net](http://www.allthatcalculator.net)

### system architecture

![image](https://user-images.githubusercontent.com/78730403/211194669-853463e1-d459-4d36-b34f-9ab2dd2972f3.png)

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

![image](https://user-images.githubusercontent.com/78730403/211194688-49a99337-40e1-42f7-be01-2d77d2789a14.png)

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

![image](https://user-images.githubusercontent.com/78730403/211194867-9e8cf188-ef2c-4b19-ae98-7029352e3b9e.png)

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

#### trouble shooting

![image](https://user-images.githubusercontent.com/78730403/210150591-9bfb7ebc-ade0-472c-a152-375524657431.png)

- for Windows, enter `wsl`
  ```bash
  wsl
  ```

```bash
sed -i -e 's/\r$//' ./server/entrypoint.sh
sed -i -e 's/\r$//' ./scripts/dev/reload-nginx.sh
```

**note** that you should visit `localhost:8080` to test in browser, not `localhost:3000`

---

## 3-C. Run both frontend & backend in local environment

![image](https://user-images.githubusercontent.com/78730403/211195240-2cfcb903-5765-4bc6-8e3c-d0dbd07e466b.png)

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
