import { ApolloServer, gql, IResolvers } from 'apollo-server-micro'

import { Todo } from '../../components/todo'
import { TodoDataSource } from '../../components/todo/todo-datasource'
import KnexConfig from '../../knexfile'

require('dotenv').config()

let idCounter = 0
// example memory storage
const todos: Record<number, Todo> = {}

const typeDefs = gql`
  type Todo {
    id: Int!
    title: String!
    done: Boolean!
  }

  type Query {
    todo(id: Int!): Todo
    todos: [Todo]
  }

  input UpdatedTodo {
    id: Int!
    title: String
    done: Boolean
  }

  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(updatedTodo: UpdatedTodo!): Todo
    deleteTodo(id: Int!): Int
  }
`

type TSource = any
type TContext = { dataSources: { todoDataSource: TodoDataSource } }

const resolvers: IResolvers<TSource, TContext> = {
  Query: {
    todo: (_, { id }) => todos[id] || null,
    todos: async (_parent, _args, { dataSources }) =>
      dataSources.todoDataSource.getAllTodos(),
  },

  Mutation: {
    addTodo: (_, { title }) => {
      const newId = ++idCounter
      const newTodo: Todo = {
        id: newId,
        title,
        done: false,
      }

      todos[newId] = newTodo

      return newTodo
    },
    updateTodo: (_, { updatedTodo }) => {
      todos[updatedTodo.id] = { ...todos[updatedTodo.id], ...updatedTodo }

      return todos[updatedTodo.id]
    },
    deleteTodo: (_, { id }) => {
      delete todos[id]
      return id
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoDataSource: new TodoDataSource(
      KnexConfig[process.env.NODE_ENV || 'development'],
    ),
  }),
})

const handler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
