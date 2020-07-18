import { Field, InputType, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Category } from '../../models/Category';
import { ObjectID } from 'mongodb';
// import { Double } from 'mongodb';

@InputType()
export class SubCategoryInput {
	@Field()
	heading: string;

	@Field()
	@Length(50, 500)
	description: string;

	@Field()
	estimatedCost: number;
}
@InputType()
export class createCategoryInput implements Partial<Category> {
	@Field()
	@Length(3, 30)
	name: string;

	@Field(() => [SubCategoryInput], { nullable: true })
	subcategory: SubCategoryInput[];
}

@InputType()
export class addSubCategoryInput {
	@Field(() => ID)
	id: ObjectID;

	@Field(() => SubCategoryInput)
	subcategory: SubCategoryInput;
}
