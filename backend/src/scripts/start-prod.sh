#!/bin/bash

export NODE_ENV=prod
export DB_URL="mongodb://localhost"
export DB_PORT=1337

ts-node src/index.ts