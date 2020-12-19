import Knex from 'knex'
import { DataSource } from 'apollo-datasource'

import { Todo } from './types'

export class TodoDataSource extends DataSource {
  private knex: Knex

  constructor(knexConfig: Parameters<typeof Knex>[0]) {
    super()
    this.knex = Knex(knexConfig)
  }

  getAllTodos() {
    return this.knex<Todo>('todos').select('*')
  }
}
