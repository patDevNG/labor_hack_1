import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { Length } from 'class-validator';
import { Category } from './Category';
// import { Double } from 'mongodb';

@ObjectType({ description: 'The SubCategory model' })
export class SubCategory {
	@Field(() => ID)
	@Property({ required: false })
	id: string;

	@Field({ nullable: true })
	@Property({ required: false })
	heading: string;

	@Field({ nullable: true })
	@Length(50, 500)
	@Property({ required: false })
	description: string;

	@Field({ nullable: true })
	@Property({ required: false })
	estimatedCost: number;

	@Field(() => Category)
	@Property({ required: true })
	category: Ref<Category>;
}

export const SubCategoryModel = getModelForClass(SubCategory);
