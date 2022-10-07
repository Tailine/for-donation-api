import { Category } from '@category/domain/category'
import { CategoryRepository } from 'category/adapter/persistence/category-repository'

export class QueryCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(categoryId: number): Promise<Category | null> {
    return this.categoryRepository.findById(categoryId)
  }
}
