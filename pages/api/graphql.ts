import { ApolloServer, gql, IResolvers } from 'apollo-server-micro'
import map from 'lodash.map'

import { Todo } from '../../components/todo'

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

const resolvers: IResolvers = {
  Query: {
    todo: (_, { id }) => todos[id] || null,
    todos: () => map(todos, todo => todo),
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

const server = new ApolloServer({ typeDefs, resolvers })

const handler = server.createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
