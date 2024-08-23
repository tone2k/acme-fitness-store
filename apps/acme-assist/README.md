## Local running

Ensure the Local Development dependencies are running. (See main [README](../../README.md))

This application also assumes there is an OPEN AI API key setup as an environment variable. 
Need to set `OPENAI_API_KEY` for the application-local.yml

This project uses Java version 21. Ensure your system has this available before running the app locally.

run locally setting up docker for dependency
```bash
docker-compose up
./gradlew bootRun --args="--spring.profiles.active=local"
```
