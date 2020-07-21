import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';

import { SubCategory } from './SubCategory';

@ObjectType({ description: 'The Category model' })
export class Category {
	@Field(() => ID)
	@Property({ required: false })
	id: string;

	@Field({ nullable: true })
	@Property({ required: true, unique: true })
	name: string;

	@Field(() => [SubCategory], { nullable: true })
	@Property({ required: false, ref: SubCategory, index: true })
	subCategory?: Ref<SubCategory>[];
}

export const CategoryModel = getModelForClass(Category);
