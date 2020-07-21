import { Resolver, Arg, Mutation, Query } from 'type-graphql';

import { CategoryModel, Category } from '../../models/Category';
import { createCategoryInput, SubCategoryInput, createTaskInput } from './input';
import { SubCategoryModel, SubCategory } from '../../models/SubCategory';
import { TaskModel } from '../../models/Task';
import { uuid } from 'uuidv4';

@Resolver()
export class CategoryResolver {
	@Mutation(() => Boolean)
	async createNewCategory(@Arg('input') input: createCategoryInput): Promise<Boolean> {
		const { name } = input;
		try {
			const availableCategory = await CategoryModel.findOne({ name: name });
			if (availableCategory) {
				throw new Error('Category already exist');
			}
			const createdCategory = await CategoryModel.create({ name });

			if (createdCategory) {
				return true;
			}
			throw new Error('something went wrong');
		} catch (error) {
			throw new Error(error);
		}
	}

	@Mutation(() => Boolean)
	async createSubCategory(@Arg('input') input: SubCategoryInput): Promise<Boolean> {
		const { category, name } = input;
		try {
			// const availableSubCategory = await SubCategoryModel.findOne({ name: name });
			// if (availableSubCategory) {
			// 	throw new Error('Subcategory already exist');
			// }
			const sub_id = uuid();
			console.log(sub_id);

			const createdSubCategory = await SubCategoryModel.create({
				name,
				index: sub_id,
			});
			if (createdSubCategory) {
				const { _id, index } = createdSubCategory;
				console.log(index);

				const updatedCategory = await CategoryModel.findByIdAndUpdate(
					category,
					{
						$push: { subCategory: _id },
					},
					{ new: true, upsert: true }
				);
				if (updatedCategory) {
					return true;
				}
			}
			throw new Error('Could not create a new subcategory');
		} catch (error) {
			throw new Error(error);
		}
	}

	@Mutation(() => Boolean)
	async createTask(@Arg('input') input: createTaskInput): Promise<Boolean> {
		const { description, estimatedCost, subCategory } = input;
		const sub_id = uuid();
		try {
			const createdTask = await TaskModel.create({
				description,
				estimatedCost,
				index: sub_id,
			});
			if (createdTask) {
				const { _id } = createdTask;
				const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
					subCategory,
					{
						$push: { task: _id },
					},
					{ new: true, upsert: true }
				);
				if (updatedSubCategory) {
					return true;
				}
			}
			throw new Error('Could not create task try again');
		} catch (error) {
			throw new Error(error);
		}
	}

	@Query(() => [Category])
	async getAllCategory() {
		const categories = await CategoryModel.find();
		return categories.map(catgeory => ({
			// ...catgeory,
			name: catgeory.name,
			id: catgeory._id,
		}));
	}

	@Query(() => [SubCategory])
	async getAllSubCategory() {
		const subcategories = await SubCategoryModel.find().populate('task');
		return subcategories;
	}

	@Query(() => [Category])
	async getSubCategory() {
		const categories = await CategoryModel.find().populate('subCategory');
		console.log(JSON.stringify(categories));
		const subcategory = JSON.stringify(categories);
		return categories;
	}
}
