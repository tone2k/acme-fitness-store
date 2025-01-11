FROM eclipse-temurin:21
WORKDIR /app

COPY build/libs/acme-assist-0.0.1-SNAPSHOT.jar /app/assist.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app/assist.jar"]
