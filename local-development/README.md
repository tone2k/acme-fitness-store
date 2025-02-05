# Local Development

## Local Dependencies

First, follow the instructions in [Spring Enterprise setup](spring-enterprise/README.md) to obtain necessary JAR files.

The included [docker-compose.yml](docker-compose.yaml) will set up the following for you for local development:

- Config Server
  - When running locally, config files are served from [this folder](./config/)
  - When deployed, config files are served from a git repository.
- Eureka Server
- Tanzu Local Authorization Server
- Tanzu Spring Cloud Gateway

```bash
cd local-development
docker compose -p acme-fitness-dependencies up -d
```

### Start each of the applications by following their README

- [acme-cart](../apps/acme-cart/README.md)
  - build local running image
  - docker compose to run locally
- [acme-catalog](../apps/acme-catalog/README.md)
  - local docker compose dependency
  - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-assist](../apps/acme-assist/README.md)
  - local docker compose dependency
  - start locally via maven wrapper / IDE (with `local` active profile)
- [acme-identity](../apps/acme-identity/README.md)
  - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-payment](../apps/acme-payment/README.md)
  - start locally via gradle wrapper or / IDE (with `local` active profile)
- [acme-order](../apps/acme-order/README.md)
  - `dotnet run` or start via IDE
- [acme-shopping](../apps/acme-shopping-react/README.md)
  - `npm install` and `npm run dev`

### Run E2E Test

Run the Cypress test in the [e2e](../e2e/README.md) directory.

### Local Development Ports

```text
localhost:8080 - acme-shopping - React - Front end
localhost:8081 - acme-assist - Spring Boot - AI integration
localhost:8082 - acme-catalog - Spring Boot - CrudRepository
localhost:8083 - acme-identity - Spring Boot - Token Resource server
localhost:8084 - acme-payment - Spring Boot - Service related to checkout
localhost:8085 - acme-cart - Python - Service for Management of Cart
localhost:8086 - acme-order - .NET/Steeltoe
localhost:8090 - spring-cloud-gateway 
localhost:8761 - local Spring Cloud Eureka server
localhost:8888 - local Spring Cloud Config Server 
localhost:9000 - Tanzu local authorization server
```

> [!NOTE]
> While acme-shopping is the front-end UI, be sure to access it through [Spring Cloud Gateway](http://localhost:8090) to avoid headaches like unexpected 404 errors.
