// import { join } from 'path';
import { knex, Knex } from 'knex';

export const connect = (dbPath: string): Knex => {
  console.log('dbPath: ', dbPath);
  return knex({
    // client: 'sqlite3',
    // connection: {
    //   filename: join(dbPath, 'db.sqlite'),
    // },
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'nickrossi',
      password : '',
      database : 'template1'
    },
    pool: {
      min: 0,
      max: 500,
      acquireTimeoutMillis: 600000,
      reapIntervalMillis: 1000,
      propagateCreateError: false
    },
    useNullAsDefault: true,
  });
};
