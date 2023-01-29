#!/bin/bash

export NODE_ENV=prod
export DB_URL="mongodb://localhost:1337"

ts-node src/index.ts