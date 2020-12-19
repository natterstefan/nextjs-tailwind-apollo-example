import React, { FunctionComponent, useState } from 'react'
import classnames from 'classnames'
import { gql, useQuery, useMutation } from '@apollo/client'
import map from 'lodash.map'

import { TodoItem, Todo, Todos } from '../components/todo'
import { LoadingSpinner } from '../components/spinner'

const TodosQuery = gql`
  query Todos {
    todos {
      id
      title
      done
    }
  }
`

const AddTodoMutation = gql`
  mutation AddTodos($title: String!) {
    addTodo(title: $title) {
      id
      title
      done
    }
  }
`
const UpdateTodo = gql`
  mutation UpdateTodos($updatedTodo: UpdatedTodo!) {
    updateTodo(updatedTodo: $updatedTodo) {
      id
      title
      done
    }
  }
`
const DeleteTodo = gql`
  mutation DeleteTodos($id: Int!) {
    deleteTodo(id: $id)
  }
`

const Page: FunctionComponent = () => {
  const [title, setTitle] = useState<string>('')

  const { data, loading } = useQuery<{ todos: Todos }>(TodosQuery)
  const [addTodo] = useMutation<Todo, { title: Todo['title'] }>(
    AddTodoMutation,
    {
      refetchQueries: [{ query: TodosQuery }],
    },
  )
  const [updateTodo] = useMutation<
    Todo,
    { updatedTodo: Partial<Todo> & { id: number } }
  >(UpdateTodo, {
    refetchQueries: [{ query: TodosQuery }],
  })
  const [deleteTodo] = useMutation<Todo, { id: Todo['id'] }>(DeleteTodo, {
    refetchQueries: [{ query: TodosQuery }],
  })

  return (
    <div className="py-20">
      <div className="h-100 w-full p-6 flex items-center justify-center">
        <div className="bg-white rounded shadow p-6 mb-4 w-full lg:w-9/12">
          <div className="mb-4">
            <h1 className="text-4xl text-gray-darkest">Todo List</h1>
            <form
              className="flex my-5"
              onSubmit={e => {
                e.preventDefault()
                if (title) {
                  addTodo({ variables: { title } })
                  setTitle('')
                }
              }}
            >
              <input
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <button
                className={classnames('w-1/5 btn-base', {
                  'btn-primary': !!title,
                  'btn-disabled': !title,
                })}
                type="submit"
                disabled={!title}
              >
                Add
              </button>
            </form>
            <div>
              {loading ? (
                <div className="flex justify-center my-5">
                  <LoadingSpinner />
                </div>
              ) : (
                <ul>
                  {map(data?.todos, (todo: Todo) => (
                    <li key={todo.id}>
                      <TodoItem
                        todo={todo}
                        onToggle={() =>
                          updateTodo({
                            variables: {
                              updatedTodo: {
                                id: todo.id,
                                title: todo.title,
                                done: !todo.done,
                              },
                            },
                          })
                        }
                        onDelete={() =>
                          deleteTodo({ variables: { id: todo.id } })
                        }
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
