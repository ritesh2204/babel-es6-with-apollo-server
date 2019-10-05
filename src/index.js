import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';

const app = express();

app.use(cors());
const schema = gql`
  type Query {
    me: User
    user(id: ID!): Us1
  }
  type User {
    username: String!
    password: Int!
  }
  type Us1 {
    name: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Ritesh Vishwakarma',
        password: 12345678
      };
    }
  }
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
