import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

ObjectType({ description: 'The Cathegory model' });
export class Category {
	@Field(() => ID)
	@Property({ required: false })
	id: string;

	@Field({ nullable: false })
	@Property({ required: true })
	name: string;
}

export const CategoryModel = getModelForClass(Category);
