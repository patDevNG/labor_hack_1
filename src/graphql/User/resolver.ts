import { Resolver, Arg, Query } from 'type-graphql';
import { User, UserModel } from '../../models/User';

@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: false })
	async returnSingleUser(@Arg('id') id: string) {
		return await UserModel.findById(id);
	}

	@Query(() => [User])
	async returnAllUser() {
		return await UserModel.find();
	}
}
