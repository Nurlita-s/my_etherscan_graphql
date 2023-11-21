const { ApolloServer } = require("apollo-server");
// Import schema 
const { importSchema } = require("graphql-import");
// Import data source
const EtherDataSource = require("./datasource/ethDatasource");
// Import schema
const typeDefs = importSchema("./schema.graphql");

// Load environment variables
require("dotenv").config();

// Define resolvers
const resolvers = {
  Query: {
    // Resolver for etherBalanceByAddress
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for totalSupplyOfEther
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for latestEthereumPrice
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for blockConfirmationTime
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Set timeout to 0
server.timeout = 0;
// Start server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
