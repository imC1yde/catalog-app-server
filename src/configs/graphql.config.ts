import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";

export const graphqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: 'src/schema.gql',
  playground: false,
  introspection: true,
  context: ({ req }) => ({ req })
}