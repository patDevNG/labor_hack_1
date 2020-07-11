import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';

// resolvers
import resolvers from './graphql';

const graphQlServer = async (app: any) => {
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: true,
		validate: false,
	});

	// create mongoose connection
	const mongoose = await connect('mongodb://patDev:planks123@ds037508.mlab.com:37508/linkup', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	await mongoose.connection;

	const server = new ApolloServer({
		context: ({ req, res }) => ({ req, res }),
		schema,
		introspection: true,
		playground: true,
	});
	server.applyMiddleware({ app, cors: true, path: '/' });
};
export default graphQlServer;
