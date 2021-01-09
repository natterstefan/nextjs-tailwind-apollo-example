import Knex from 'knex'
import { DataSource } from 'apollo-datasource'

import { Todo } from './types'

export class TodoDataSource extends DataSource {
  private knex: Knex

  constructor(knexConfig: Parameters<typeof Knex>[0]) {
    super()
    this.knex = Knex(knexConfig)
  }

  /**
   * Get all Todos
   *
   * @see http://knexjs.org/#Builder-select
   */
  getAllTodos() {
    return this.knex<Todo>('todos').select('*').orderBy('id')
  }

  /**
   * Get a Todo by ID
   *
   * @see http://knexjs.org/#Builder-select
   */
  getTodo(id: Todo['id']) {
    return this.knex<Todo>('todos').select('*').where('id', id)
  }

  /**
   * Insert a new Todo
   *
   * @see http://knexjs.org/#Builder-insert
   */
  insertTodo(title: Todo['title']) {
    return this.knex<Todo>('todos').insert({ title }, ['*'])
  }

  /**
   * Update a Todo
   *
   * @see http://knexjs.org/#Builder-update
   * @see http://knexjs.org/#Builder-merge
   */
  updateTodo(todo: Partial<Todo>) {
    return this.knex<Todo>('todos').insert(todo, ['*']).onConflict('id').merge()
  }

  /**
   * Delete a Todo
   *
   * @see http://knexjs.org/#Builder-del%20/%20delete
   */
  deleteTodo(id: Todo['id']) {
    return this.knex<Todo>('todos').where('id', id).delete(['id'])
  }
}
