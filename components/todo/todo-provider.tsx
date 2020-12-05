import React, {
  FunctionComponent,
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from 'react'

import { Todos, TodoContextType, TodoUpdate } from './types'

const TodoContext = createContext<TodoContextType>(undefined)

export const TodoProvider: FunctionComponent = ({ children }) => {
  const id = useRef(0)
  const [todos, setTodos] = useState<Todos>({})

  const createTodo = useCallback((title: string) => {
    setTodos(oldTodos => {
      const nextId = ++id.current

      return { ...oldTodos, [nextId]: { id: nextId, title, done: false } }
    })
  }, [])

  const updateTodo = useCallback((todoUpdate: TodoUpdate) => {
    setTodos(oldTodos => {
      return {
        ...oldTodos,
        [todoUpdate.id]: { ...oldTodos[todoUpdate.id], ...todoUpdate },
      }
    })
  }, [])

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(oldTodos => {
      const newTodos = { ...oldTodos }
      delete newTodos[todoId]
      return newTodos
    })
  }, [])

  const todoList = useMemo(() => {
    return Object.keys(todos).map(key => todos[key])
  }, [todos])

  return (
    <TodoContext.Provider
      value={{ todos: todoList, createTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)
