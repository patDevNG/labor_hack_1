import { ObjectType, Field } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Location {
	@Field({ nullable: true })
	@Property({ required: false })
	state: string;

	@Field({ nullable: true })
	@Property({ required: false })
	address: string;
}

export const LocationModel = getModelForClass(Location);
