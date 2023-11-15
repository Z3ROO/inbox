#!/bin/bash

export NODE_ENV=dev
export SERVER_PORT=3001
export DB_URL="mongodb://localhost"
export DB_PORT=3002

export PGUSER="sara"
export PGPORT=3003
export PGHOST="localhost"
export PGPASSWORD="1937"
export PGDATABASE="main"

nodemon src/index.ts