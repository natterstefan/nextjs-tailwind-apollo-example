import React, { FunctionComponent, useState } from 'react'
import classnames from 'classnames'

import { TodoItem, useTodoContext } from '../components/todo'

const Page: FunctionComponent = () => {
  const { createTodo, deleteTodo, updateTodo, todos } = useTodoContext()
  const [title, setTitle] = useState<string>('')

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
                  createTodo(title)
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
              <ul>
                {todos &&
                  todos.map(todo => (
                    <li key={todo.id}>
                      <TodoItem
                        todo={todo}
                        onToggle={() =>
                          updateTodo({ id: todo.id, done: !todo.done })
                        }
                        onDelete={() => deleteTodo(todo.id)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
