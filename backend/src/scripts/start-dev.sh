#!/bin/bash

export NODE_ENV=dev
export SERVER_PORT=3001
export DB_URL="mongodb://localhost"
export DB_PORT=3002

nodemon src/index.ts