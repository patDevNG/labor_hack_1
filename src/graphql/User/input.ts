import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsPhoneNumber } from 'class-validator';
import { User, Role } from '../../models/User';
@InputType()
export class LocationInput {
	@Field({ nullable: true })
	state: string;

	@Field({ nullable: true })
	address: string;
}
@InputType()
export class createUserInput implements Partial<User> {
	@Field()
	@Length(3, 25)
	firstName: string;

	@Field()
	@Length(3, 25)
	lastName: string;

	@Field()
	@IsEmail()
	email: string;

	@Field({ nullable: true })
	@IsPhoneNumber('NG')
	phoneNumber: string;

	@Field(() => [LocationInput])
	location: LocationInput[];

	@Field()
	uid: string;

	@Field(() => Role, { nullable: true })
	role = Role.ADMIN;
}

@InputType()
export class loginUserInput implements Partial<User> {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;
}
