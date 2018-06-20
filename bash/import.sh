#!bin/bash
_import_file="backup/data.sql"

docker exec -i $(docker-compose ps -q db) mysql -uroot -p$(docker exec $(docker-compose ps -q db) env | grep MYSQL_ROOT_PASSWORD | cut -d'=' -f2) --database=$(docker exec $(docker-compose ps -q db) env | grep MYSQL_DATABASE | cut -d'=' -f2) < $(echo "$_import_file")
