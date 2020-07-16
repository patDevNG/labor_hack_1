// import { Resolver, Arg, Mutation } from 'type-graphql';

// import { Category, CategoryModel } from '../../models/Category';
// import { createCategoryInput } from './input';

// @Resolver()
// export class CategoryResolver {
// 	@Mutation(() => Category)
// 	async createNewCategory(@Arg('input') input: createCategoryInput): Promise<Category> {
// 		const { name } = input;
// 		try {
// 			const user = await CategoryModel.create({ name });
// 			if (user) {
// 				return user;
// 			}
// 			throw new Error('something went wrong');
// 		} catch (error) {
// 			throw new Error(error);
// 		}
// 	}
// }
