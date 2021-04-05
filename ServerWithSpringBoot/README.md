#Docker Configuration and run.

#Pull mysql and config
docker pull mysql:5.6
docker run --name mysql-standalone -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=spring_db -e MYSQL_USER=sa -e MYSQL_PASSWORD=123456 -d mysql:5.6

#Build image and link to db
docker build . -t article-app-mysql
docker run -p 8081:8086 --name article-app-mysql-i1 --link mysql-standalone:mysql -d article-app-mysql

#Stop and remove container
docker stop article-app-mysql-i1
docker container rm  article-app-mysql-i1

#Push to docker hub
docker tag article-app-mysql mohammadi1360/article-app-mysql
docker push mohammadi1360/article-app-mysql

#Clear containers
docker rmi article-app-mysql
docker rmi -f mohammadi1360/article-app-mysql

#Run from Docker hub
docker run -p 8081:8086 --name article-app-mysql-i1 --link mysql-standalone:mysql -d mohammadi1360/article-app-mysql

#Connect to db:
docker exec -it mysql-standalone bash -l
mysql -uroot -p123456
select * from spring_db.user;
select * from spring_db.article;
