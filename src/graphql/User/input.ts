import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsPhoneNumber } from 'class-validator';
import { User } from '../../models/User';

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

	@Field()
	uid: string;

	@Field(() => String, { nullable: true })
	role = 'user';
}

@InputType()
export class loginUserInput implements Partial<User> {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;
}
