import { Resolver, Arg, Mutation } from 'type-graphql';

import { Category, CategoryModel } from '../../models/Category';
import { createCategoryInput } from './input';

@Resolver()
export class CategoryResolver {
	@Mutation(() => Category)
	async createNewCategory(@Arg('input') input: createCategoryInput): Promise<Category> {
		const { name } = input;
		try {
			const availableCategory = await CategoryModel.findOne({ name: name });
			if (availableCategory) {
				throw new Error('Category already exist');
			}
			const createdCategory = await CategoryModel.create({ name });
			console.log(createdCategory);

			if (createdCategory) {
				return createdCategory;
			}
			throw new Error('something went wrong');
		} catch (error) {
			throw new Error(error);
		}
	}
}
