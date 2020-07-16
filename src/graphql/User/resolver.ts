import { Resolver, Arg, Query, Mutation } from 'type-graphql';
// import bcrypt from 'bcryptjs';
import { User, UserModel } from '../../models/User';
import utils from '../../utils';

import { createUserInput } from './input';
const { firebase } = utils;
const { firebase: fireBase } = firebase;
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
		const { firstName, lastName, email, phoneNumber, role, uid, location } = input;
		console.log(location);
		const locationToSave = [location];
		// locationToSave.push(location);
		console.log(locationToSave);

		// const locationTosave = {
		// 	state: state,
		// 	address: address,
		// };
		// await admin.auth().setCustomUserClaims(uid, { role });
		const createdUser = await UserModel.create({
			firstName,
			lastName,
			email,
			phoneNumber,
			role,
			uid,
			location,
		});
		console.log(createdUser);

		if (createdUser) {
			return createdUser;
		}
		throw new Error('Something went wrong');
	}

	@Mutation(() => User)
	async requestResetPassword(@Arg('email') email: string): Promise<String> {
		try {
			const user = await UserModel.findOne({ email: email.trim() });
			if (user) {
				await fireBase.auth().sendPasswordResetEmail(email);
				return 'Reset password is successful';
			}
			throw new Error('User does not exist');
		} catch (error) {
			throw new Error(error);
		}
	}
}
