import { ObjectType, Field } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { Length } from 'class-validator';
// import { Double } from 'mongodb';

@ObjectType({ description: 'The SubCategory model' })
export class SubCategory {
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
}

export const SubCategoryModel = getModelForClass(SubCategory);
