import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Length } from 'class-validator';
import { Task } from './Task';

// import { Category } from './Category';

@ObjectType({ description: 'The SubCategory model' })
export class SubCategory {
	@Field(() => ID, { nullable: true })
	@Property({ required: false })
	id: string;

	@Field({ nullable: false })
	@Length(3, 40)
	@Property({ required: true })
	name: string;

	@Field({ nullable: true })
	@Property({ required: true })
	index: string;

	@Field(() => [Task], { nullable: true })
	@Property({ required: false, ref: Task, index: true })
	task?: Ref<Task>[];
}

export const SubCategoryModel = getModelForClass(SubCategory);
