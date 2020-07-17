import { Resolver, Arg, Mutation } from 'type-graphql';

import { Category, CategoryModel } from '../../models/Category';
import { createCategoryInput, addSubCategoryInput } from './input';

@Resolver()
export class CategoryResolver {
	@Mutation(() => Category)
	async createNewCategory(@Arg('input') input: createCategoryInput): Promise<Category> {
		const { name, subcategory } = input;
		try {
			const availableCategory = await CategoryModel.findOne({ name: name });
			if (availableCategory) {
				throw new Error('Category already exist');
			}
			const createdCategory = await CategoryModel.create({ name, subcategory });

			if (createdCategory) {
				const { _id } = createdCategory;
				const category = await CategoryModel.findById(_id);
				if (category) {
					category.id = _id;
					return category;
				}
				throw Error('Something went wrong');
			}
			throw new Error('something went wrong');
		} catch (error) {
			throw new Error(error);
		}
	}

	@Mutation(() => Category)
	async addSubCategory(@Arg('input') input: addSubCategoryInput): Promise<Category> {
		const { id, subcategory } = input;
		try {
			const categoryToUpdate = await CategoryModel.findById(id);
			if (categoryToUpdate) {
				const subCategoryToUpdate = categoryToUpdate.subcategory;
				subCategoryToUpdate.push(subcategory);
				await categoryToUpdate.save();
				return categoryToUpdate;
			}
			throw new Error('Could not update subcategory');
		} catch (error) {
			throw new Error(error);
		}
	}
}
