import { Field, InputType, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Category } from '../../models/Category';
import { ObjectId } from 'mongodb';

@InputType()
export class SubCategoryInput {
	@Field()
	name: string;

	@Field(() => ID)
	category: ObjectId;
}
@InputType()
export class createCategoryInput implements Partial<Category> {
	@Field()
	@Length(3, 30)
	name: string;
}

@InputType()
export class addSubCategoryInput {
	@Field(() => ID)
	id: ObjectId;

	@Field(() => SubCategoryInput)
	subCategory: SubCategoryInput;
}

@InputType()
export class createTaskInput {
	@Field()
	description: string;

	@Field()
	estimatedCost: number;

	@Field(() => ID)
	subCategory?: ObjectId;
}
