import { Category } from 'category/domain/category'

export interface QueryCategoryPort {
  getById(categoryId: number): Promise<Category | null>
  getAll(): Promise<Category[] | null>
}
