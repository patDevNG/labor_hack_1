import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { Category } from '../../models/Category';

@InputType()
export class createCategoryInput implements Partial<Category> {
	@Field()
	@Length(3, 30)
	name: string;
}
