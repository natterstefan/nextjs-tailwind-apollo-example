exports.up = async knex =>
  knex.schema.createTable('todos', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.boolean('done').defaultTo(false)
  })

exports.down = async knex => knex.schema.dropTableIfExists('todos')
