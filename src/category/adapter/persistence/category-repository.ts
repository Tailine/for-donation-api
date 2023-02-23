import { Category } from './category.entity'

export interface CategoryRepository {
  findById(id: number): Promise<Category | null>
  findAll(): Promise<Category[] | null>
}
