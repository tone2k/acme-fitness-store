# ACME Fitness Store

ACME Fitness store is a fictional online retailer selling sporting goods. This repo contains the source code and deployment scripts for the ACME Fitness store application.

## High Level Architecture
![An image showing the services involved in the ACME Fitness Store. It depicts the applications and their dependencies](media/acme-fitness-store-architecture.png)

This application is composed of several services:

* 4 Java Spring Boot applications:
  * A catalog service for fetching available products. 
  * A payment service for processing and approving payments for users' orders
  * An identity service for referencing the authenticated user
  * An assist service for infusing AI into fitness store

* 1 Python application:
  * A cart service for managing a users' items that have been selected for purchase

* 1 ASP.NET Core applications:
  * An order service for placing orders to buy products that are in the users' carts

* 1 NodeJS and static HTML Application
  * A frontend shopping application

The sample can be deployed to Azure Spring Apps Enterprise or Tanzu Application Platform. 

## Repo Organization

| Directory                                                        | Purpose |
| ---------------------------------------------------------------- | ------------- |
| [apps/](./apps)                                                   | source code for the services  |

================================================================
## Deploy on Tanzu Platform for Cloud Foundry (TPCF aka TAS)

Assumption that the proper Cloud Foundry CLI has been installed.

#### Create Services
```bash
cf create-service p.redis on-demand-cache acme-redis 
cf create-service postgres on-demand-postgres-db acme-postgres
cf create-service postgres on-demand-postgres-db acme-assist-postgres
cf create-service postgres on-demand-postgres-db acme-order-postgres       

# This sets up your TAS/TPCF config server. It assumes that your config files are located at <this-repository-url> in the branch config (label) under the directory config (searchPaths). You can checkout the branch to see the structure if you like.
cf create-service p.config-server standard acme-config  -c  '{ "git": { "uri": "<this-repository-url>", "label": "config", "searchPaths": "config" } }'

# This assumes Tanzu Single Sign on for TAS/TPCF is installed and configured against UAA.  You can also use other identity providers if you change the plan and binding below.
cf create-service p-identity uaa acme-sso   
cf create-service p.service-registry standard acme-registry  
cf create-service p.gateway standard acme-gateway -c '{"sso": { "plan": "uaa", "scopes": ["openid", "profile", "email"] }, "host": "acme-fitness" ,"cors": { "allowed-origins": [ "*" ] }}'

# This assumes you have a Chat and Embedding model plan configured with GenAI for Tanzu Platform v0.6+
cf create-service genai <CHAT MODEL PLAN> acme-genai-chat
cf create-service genai <EMBED MODEL PLAN> acme-genai-embed
```

#### Identity Service
```bash
cd acme-identity
./gradlew assemble
cf push --no-start
cf bind-service acme-identity acme-registry

# Replace [YOUR APPS DOMAIN] with your TPCF's apps domain for the gateway
cf bind-service acme-identity acme-sso -c '{  "grant_types": ["authorization_code"],
    "scopes": ["openid"],
    "authorities": ["openid"],
    "redirect_uris": ["https://acme-fitness.[YOUR APPS DOMAIN]/"],
    "auto_approved_scopes": ["openid"],
    "identity_providers": ["uaa"],
    "show_on_home_page": false}'
 
cf bind-service acme-identity acme-gateway -c identity-routes.json
cf start acme-identity

```
#### Cart Service
```bash
cd ../acme-cart
cf push --no-start
cf bind-service acme-cart acme-gateway -c cart-routes.json
cf start acme-cart
```

#### Payment Service
```bash
cd ../acme-payment
./gradlew assemble
cf push --no-start
cf bind-service acme-payment acme-gateway -c pay-routes.json
cf start acme-payment
```

#### Catalog Service
```bash
cd ../acme-catalog
./gradlew clean assemble
cf push --no-start
cf bind-service acme-catalog acme-gateway -c catalog-service_rate-limit.json
cf start acme-catalog
```

#### Acme Assist
```bash
cd ../acme-assist
./gradlew clean assemble

# Use this with GenAI 0.6+
cf push --no-start 
cf add-network-policy acme-assist acme-catalog
cf bind-service acme-assist acme-gateway -c assist-routes.json
cf start acme-assist
```

#### Order Service
```bash
cd ../acme-order
dotnet publish -r linux-x64
cf push --no-start
cf add-network-policy acme-order acme-payment
cf bind-service acme-order acme-gateway -c order-routes.json
cf start acme-order
```

#### Shopping Service
```bash
cd ../acme-shopping-react
cf push --no-start
cf bind-service acme-shopping acme-gateway -c frontend-routes.json
cf start acme-shopping
```
=================================================

Note: ensure that the environment variable for TAS has 
`SPRING_MVC_STATIC_PATH_PATTERN: /static/images/**` set.  Currently have an issue with the value taken from config server being overwritten.

## Local Development setup
- [Local Development guide](local-development/README.md)

## TAS Development Tricks

### Connecting to Database

https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-services.html

`cf ssh -L 65432:{host-of-database-on-TAS}:5432 {application-name}`
