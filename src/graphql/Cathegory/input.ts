import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { Category } from '../../models/Category';
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

	@Field(() => [SubCategoryInput])
	subcategory: SubCategoryInput[];
}
