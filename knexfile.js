// Update with your config settings.
module.exports = {
  // process.env.NODE_ENV
  development: {
    client: 'postgresql',
    connection: {
      database: 'todo',
      user: 'postgres',
      password: 'postgres',
      port: 15432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
