export type Todo = {
  id: number
  title: string
  done: boolean
}

export type Todos = Record<number, Todo>

export type TodoUpdate = Partial<Todo> & { id: number }

export type TodoContextType = {
  todos: Todo[]
  createTodo: (title: Todo['title']) => void
  updateTodo: (todoUpdate: TodoUpdate) => void
  deleteTodo: (id: Todo['id']) => void
}
