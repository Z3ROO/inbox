#!/bin/bash

export NODE_ENV=dev
export DB_URL="mongodb://localhost:3002"

nodemon src/index.ts