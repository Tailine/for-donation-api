import { Category } from 'category/domain/category'

export interface QueryCategoryPort {
  execute(): Promise<Category | null>
}
