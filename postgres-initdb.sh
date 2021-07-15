#!/bin/sh -e

psql <<- EOSQL
    CREATE USER postgres;
    CREATE DATABASE postgres;
    GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
EOSQL
