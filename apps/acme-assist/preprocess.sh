#!/bin/sh
mvn spring-boot:run -Dstart-class=com.example.acme.assist.tools.BuildVectorStoreApplication -Dspring-boot.run.profiles=buildvector -Dspring-boot.run.arguments="--from=$1 --to=$2"
