import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
// resolvers
import resolvers from './graphql';

const graphQlServer = async (app: any) => {
	const schema = await buildSchema({
		resolvers,
		emitSchemaFile: true,
		validate: false,
	});
	dotenv.config();

	// create mongoose connection
	const mongoose = await connect(`${process.env._MONGO_URI_LOCAL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	await mongoose.connection;

	const { ObjectId } = mongoose.Types;
	ObjectId.prototype.valueOf = () => toString();
	const server = new ApolloServer({
		context: ({ req, res }) => ({ req, res }),
		schema,
		introspection: true,
		playground: true,
	});
	server.applyMiddleware({ app, cors: true, path: '/' });
};
export default graphQlServer;
