import { Resolver, Arg, Mutation, Query } from 'type-graphql';

import { Category, CategoryModel } from '../../models/Category';
import { createCategoryInput, addSubCategoryInput } from './input';
import { SubCategory, SubCategoryModel } from '../../models/SubCategory';

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

	@Mutation(() => SubCategory)
	async addSubCategory(@Arg('input') input: addSubCategoryInput): Promise<SubCategory> {
		const { id, subcategory } = input;
		try {
			const createdSubCategory = await SubCategoryModel.create({
				...subcategory,
				category: id,
			});
			console.log(createdSubCategory);
			if (createdSubCategory) {
				const { _id } = createdSubCategory;
				const subCategory = await SubCategoryModel.findById(_id);
				if (subCategory) {
					subCategory.id = _id;
					return subCategory;
				}
			}
			throw new Error('Could not create subcategory');
		} catch (error) {
			throw new Error(error);
		}
	}
	@Query(() => Category)
	async getCategory(@Arg('id') id: string) {
		return await CategoryModel.findById(id);
	}

	@Query(() => [Category])
	async getAllCategory() {
		const categories = await CategoryModel.find();
		return categories.map(catgeory => ({ id: catgeory._id, name: catgeory.name }));
	}

	@Query(() => [SubCategory])
	async getSubCategory() {
		return await SubCategoryModel.find().populate('category');
	}

	@Query(() => SubCategory)
	async getAspecificSubCategoryWithCategory(@Arg('id') id: string): Promise<SubCategory> {
		const specificSubCategory = await SubCategoryModel.findById(id).populate('category');
		if (specificSubCategory) {
			let { _id } = specificSubCategory;
			specificSubCategory.id = _id;
			return specificSubCategory;
		}
		throw new Error('Something went wrong');
	}
	@Query(() => SubCategory)
	async getSpecificSubCategory(@Arg('id') id: string): Promise<SubCategory> {
		const subCategory = await SubCategoryModel.findById(id);
		if (subCategory) {
			let { _id } = subCategory;
			subCategory.id = _id;
			return subCategory;
		}
		throw new Error('Something went wrong');
	}
}
