FROM eclipse-temurin:21
WORKDIR /app

COPY build/libs/acme-catalog-0.0.1-SNAPSHOT.jar /app/catalog.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "/app/catalog.jar"]

