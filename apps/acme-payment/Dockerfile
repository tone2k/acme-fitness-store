FROM eclipse-temurin:21
WORKDIR /app

COPY build/libs/acme-payment-0.0.1-SNAPSHOT.jar /app/payment.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "/app/payment.jar"]

