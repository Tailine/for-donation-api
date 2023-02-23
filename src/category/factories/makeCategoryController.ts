import { CategoryController } from '@category/adapter/category-controller'
import { TypeormCategoryRepository } from '@category/adapter/persistence/typeorm-category-repository-adapter'
import { QueryCategoryService } from '@category/application/services/category-query-service'

export const makeCategoryController = () => {
  const categoryRepository = new TypeormCategoryRepository()
  const categoryService = new QueryCategoryService(categoryRepository)
  return new CategoryController(categoryService)
}
