#!/bin/bash

export NODE_ENV=prod
export SERVER_PORT=3001
export DB_URL="mongodb://localhost"
export DB_PORT=1337

ts-node src/index.ts