FROM eclipse-temurin:21
WORKDIR /app

COPY build/libs/acme-identity-0.0.1-SNAPSHOT.jar /app/identity.jar

EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/app/identity.jar"]

