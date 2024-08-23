# Identity


> An identity service, as a wrapper for the provided SSO service.

The goal of this specific service is to emulate a User account service.

## Local running

Ensure the local development dependencies are running. (See main [README](../../README.md))

Ensure the local authentication server is setup or have it connect to your preferred SSO provider.
`/local-development`

To run locally

`./gradlew bootRun --args="--spring.profiles.active=local"`

