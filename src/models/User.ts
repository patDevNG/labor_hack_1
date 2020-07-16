import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Location } from './types';

@ObjectType({ description: 'The User model' })
export class User {
	@Field(() => ID)
	@Property({ required: false })
	id: string;

	@Field({ nullable: true })
	@Property({ required: false })
	firstName: string;

	@Field({ nullable: true })
	@Property({ required: false })
	phoneNumber: string;

	@Field({ nullable: true })
	@Property({ required: false })
	lastName: string;

	@Field({ nullable: true })
	@Property({ required: false })
	email: string;

	// @Field({ nullable: true })
	// @Property({ required: false })
	// password: string;

	@Field(() => String)
	@Property({ required: false })
	role = 'user';

	@Field(() => Location, { nullable: true })
	@Property({ required: false, ref: 'Location', _id: false })
	location: Ref<Location>;

	@Field(() => ID)
	@Property({ required: true })
	uid: string;
}

export const UserModel = getModelForClass(User);
