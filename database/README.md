## INSTALL MARIADB-CLIENT on backend container

1. Attach to backend container
   ```bash
   docker exec -it backend /bin/bash
   ```
2. Configure APT package repositories

   ```bash
   apt install wget

   wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup

   echo "ad125f01bada12a1ba2f9986a21c59d2cccbe8d584e7f55079ecbeb7f43a4da4 mariadb_repo_setup" \
   | sha256sum -c -

   chmod +x mariadb_repo_setup

   ./mariadb_repo_setup \
   --mariadb-server-version="mariadb-10.6"

   apt update
   ```

3. Install MariaDB Client and package dependencies:
   ```bash
   apt install mariadb-client
   ```

## DUMP DATABASE

```bash
mysqldump <MYSQL_DATABASE> -h <MYSQL_HOST> -u <USER> -p > <FILE_PATH>.sql
```
