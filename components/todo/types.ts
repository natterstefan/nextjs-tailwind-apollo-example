export type Todo = {
  /**
   * The Todo's id
   */
  id: number
  /**
   * The Todo's title
   */
  title: string
  /**
   * The Todo's current done state
   */
  done: boolean
}

export type Todos = Todo[]
