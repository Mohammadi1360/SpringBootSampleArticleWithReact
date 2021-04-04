#Docker Configuration and run.

docker pull mysql:5.6
docker run --name mysql-standalone -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=spring_db -e MYSQL_USER=sa -e MYSQL_PASSWORD=123456 -d mysql:5.6 --name mysql-standalone -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=spring_db -e MYSQL_USER=sa -e MYSQL_PASSWORD=123456 -d mysql:5.6

docker build . -t article-app-mysql
docker run -p 8081:8086 --name article-app-mysql-i1 --link mysql-standalone:mysql -d article-app-mysql

docker stop article-app-mysql-i1
docker container rm  article-app-mysql-i1
