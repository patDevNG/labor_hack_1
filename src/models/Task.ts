import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Length } from 'class-validator';

@ObjectType({ description: 'The Task Model' })
export class Task {
	@Field(() => ID, { nullable: true })
	@Property({ required: false })
	id: string;

	@Field({ nullable: true })
	@Length(3, 40)
	@Property({ required: true })
	description: string;

	@Field({ nullable: true })
	@Property({ required: true })
	estimatedCost: number;

	@Field({ nullable: true })
	@Property({ required: true })
	index: string;
}

export const TaskModel = getModelForClass(Task);
