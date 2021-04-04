FROM openjdk:8
ADD target/article-app-mysql-1.jar article-app-mysql.jar
EXPOSE 8086
ENTRYPOINT ["java","-jar","article-app-mysql.jar"]
