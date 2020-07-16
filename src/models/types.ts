import { Field, InputType, ObjectType, ID } from 'type-graphql';
import { prop as Property } from '@typegoose/typegoose';
@InputType()
export class LocationInput {
	@Field({ nullable: true })
	state: string;

	@Field({ nullable: true })
	address: string;

	@Field(() => ID, { nullable: true })
	id: string;
}

@ObjectType()
export class Location {
	@Field(() => ID, { nullable: true })
	@Property({ required: false })
	id: string;

	@Field({ nullable: true })
	state: string;

	@Field({ nullable: true })
	address: string;
}
