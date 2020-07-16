import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Location } from './Location';

export enum Role {
	CLIENT = 'CLIENT',
	TRADESMAN = 'TRADESMAN',
	ADMIN = 'ADMIN',
}
registerEnumType(Role, {
	name: 'Role',
});
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

	@Field(() => Role)
	@Property({ required: false })
	role = Role.CLIENT;

	@Field(() => [Location], { nullable: true })
	@Property({ required: false, type: Location })
	location: Location[];

	@Field(() => ID)
	@Property({ required: true })
	uid: string;
}

export const UserModel = getModelForClass(User);
