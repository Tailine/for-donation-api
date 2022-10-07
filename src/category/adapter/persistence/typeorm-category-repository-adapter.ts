import { postgresDataSource } from '@config/typeorm'
import { Repository } from 'typeorm'
import { CategoryRepository } from './category-repository'
import { Category } from './category.entity'

export class TypeormCategoryRepository implements CategoryRepository {
  private readonly categoryRepository: Repository<Category>

  constructor() {
    this.categoryRepository = postgresDataSource.getRepository(Category)
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOneBy({ id })
  }
}
