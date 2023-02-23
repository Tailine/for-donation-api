import { Request, Response } from 'express'
import { QueryCategoryPort } from './../application/ports/query-category-port'

export class CategoryController {
  constructor(private categoryService: QueryCategoryPort) {}

  execute = async (_: Request, response: Response) => {
    try {
      const categories = await this.categoryService.getAll()
      return response.status(200).json(categories)
    } catch (err) {
      return response.status(500).json({
        message: 'Erro no servidor, tente novamente mais tarde'
      })
    }
  }
}
