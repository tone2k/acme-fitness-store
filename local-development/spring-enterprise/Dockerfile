FROM eclipse-temurin:21
WORKDIR /app


COPY run.sh .
COPY gateway-2.2.4.jar .
COPY tanzu-local-authorization-server.jar .
COPY routes.yml .
COPY scg-config.yml .

RUN chmod +x run.sh

EXPOSE 8090
EXPOSE 9000

ENTRYPOINT ["./run.sh"]
