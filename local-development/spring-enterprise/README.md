### Tanzu Local Authorization Server

Follow the instructions on ["Getting Started with Tanzu Local Authorization Server"](https://docs.vmware.com/en/Tanzu-Spring-Runtime/Commercial/Tanzu-Spring-Runtime/local-auth-server-about-local-auth-server.html) to obtain the jar executable from Broadcom download portal.

Place the jar named as `tanzu-local-authorization-server.jar` into the directory `local-development/spring-enterprise`.

Once the jar is placed correctly, the included [docker-compose.yml](docker-compose.yaml) starts a local instance of Tanzu Local Authentication Server, listening on port 9000.

### Spring Cloud Gateway Server

Use the same Broadcom download portal to get the Spring Commercial Gateway Jar for running local.
Place the jar named as `tanzu-spring-cloud-gateway.jar` into the directory `local-development/spring-enterprise`

Once the jar is placed correctly, included [docker-compose.yml](docker-compose.yaml) starts a local instance of Spring Cloud Gateway Server, listening on port 8090.
