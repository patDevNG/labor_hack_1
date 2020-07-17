import { Resolver, Arg, Query, Mutation } from 'type-graphql';

import { User, UserModel, Role } from '../../models/User';

import utils from '../../utils';

import { createUserInput } from './input';
const { firebase } = utils;
const { firebase: fireBase, admin } = firebase;
@Resolver()
export class UserResolver {
	@Query(() => User, { nullable: true })
	async returnSingleUser(@Arg('id') id: string) {
		return await UserModel.findById(id);
	}

	@Query(() => [User])
	async returnAllUser() {
		return await UserModel.find();
	}

	@Mutation(() => User)
	async createNewUser(@Arg('input') input: createUserInput): Promise<User> {
		// await admin.auth().setCustomUserClaims(uid, { role });
		const { role } = input;
		const createdUser = await UserModel.create({
			...input,
		});

		if (createdUser) {
			const { _id } = createdUser;
			if (role === Role.TRADESMAN) {
				// add to tradesman collection
				//remember to passing userId as _id
			}
			const user = await UserModel.findById(_id);

			if (user) {
				user.id = _id;
				return user;
			}
			throw new Error('User not created');
		}

		throw new Error('Something went wrong');
	}

	@Mutation(() => User)
	async requestResetPassword(@Arg('email') email: string): Promise<String> {
		try {
			const user = await UserModel.findOne({ email: email.trim() });
			if (user) {
				await fireBase.auth().sendPasswordResetEmail(email.trim());
				return 'Reset password is successful';
			}
			throw new Error('User does not exist');
		} catch (error) {
			throw new Error(error);
		}
	}

	@Query(() => User)
	async lastSignInTime(@Arg('email') email: string): Promise<String> {
		try {
			const userRecord = await admin.auth().getUserByEmail(email.trim());
			const lastSignIn = userRecord.metadata.lastSignInTime;
			return lastSignIn;
		} catch (error) {
			throw new Error(error);
		}
	}
}
