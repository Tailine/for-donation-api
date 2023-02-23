import { QueryCategoryPort } from './../ports/query-category-port'
import { Category } from '@category/domain/category'
import { CategoryRepository } from 'category/adapter/persistence/category-repository'

export class QueryCategoryService implements QueryCategoryPort {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll(): Promise<Category[] | null> {
    return this.categoryRepository.findAll()
  }

  async getById(categoryId: number): Promise<Category | null> {
    return this.categoryRepository.findById(categoryId)
  }
}
