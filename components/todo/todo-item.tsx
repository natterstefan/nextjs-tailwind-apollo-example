import React, { FunctionComponent } from 'react'

import { Todo } from './types'

type TodoItem = { todo: Todo; onToggle: () => void; onDelete: () => void }

export const TodoItem: FunctionComponent<TodoItem> = ({
  todo,
  onToggle,
  onDelete,
}) => (
  <div className="flex mb-4 items-center space-x-2">
    <input
      type="checkbox"
      className="flex-shrink-0 form-tick appearance-none h-6 w-6 shadow border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
      checked={todo.done}
      onChange={onToggle}
    />
    <p className="w-full text-gray-darkest">{todo.title}</p>
    <button
      className="flex-shrink-0 btn-base btn-danger"
      type="button"
      onClick={onDelete}
    >
      Remove
    </button>
  </div>
)
