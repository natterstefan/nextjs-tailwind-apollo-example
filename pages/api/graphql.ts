import { ApolloServer, gql, IResolvers } from 'apollo-server-micro'

import { TodoDataSource } from '../../components/todo/todo-datasource'
import KnexConfig from '../../knexfile'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

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
    todo: async (_, { id }, { dataSources }) => {
      const [res] = await dataSources.todoDataSource.getTodo(id)
      return res
    },
    todos: async (_parent, _args, { dataSources }) =>
      dataSources.todoDataSource.getAllTodos(),
  },

  Mutation: {
    addTodo: async (_, { title }, { dataSources }) => {
      const [res] = await dataSources.todoDataSource.insertTodo(title)
      return res
    },
    updateTodo: async (_, { updatedTodo }, { dataSources }) => {
      const [res] = await dataSources.todoDataSource.updateTodo(updatedTodo)
      return res
    },
    deleteTodo: async (_, { id }, { dataSources }) => {
      const [res] = await dataSources.todoDataSource.deleteTodo(id)
      return res.id
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
