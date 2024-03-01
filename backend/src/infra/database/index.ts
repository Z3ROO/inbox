export * from './mongodb';
export * from './postgres';

import knex from 'knex';
import knexfile from '../../../knexfile';

const knex_db = knex(knexfile.development);
