import './src/util/env-variables';
import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
      host: process.env.PGHOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations_dev",
      directory: './src/infra/database/migrations'
    }
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: Number(process.env.PGPORT),
      host: process.env.PGHOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations_prod",
      directory: './src/infra/database/migrations'
    }
  }

};

export default config

// module.exports = config;
