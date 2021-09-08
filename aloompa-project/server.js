const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const { TimestampType } = require('./schema/timestamp');

const server = new ApolloServer({ typeDefs, Date: TimestampType, resolvers });

server.listen().then(({ url }) => {
	console.log(`server running on ${url}`);
});
