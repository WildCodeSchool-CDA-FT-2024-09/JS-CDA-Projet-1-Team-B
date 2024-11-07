import { Resolver, Query, Int, Arg } from "type-graphql";
import { Category } from "../entities/Category";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await Category.find();
  }

  @Query(() => Category, { nullable: true })
  async getCategoryById(
    @Arg("id", () => Int) id: number
  ): Promise<Category | null> {
    const category = await Category.findOne({ where: { id } });
    return category || null;
  }
}
