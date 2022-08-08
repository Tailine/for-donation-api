import { Result } from 'shared/result'

export class Category {
  private constructor(
    private readonly id: string,
    private readonly name: string
  ) {
    Object.freeze(this)
  }

  static create(id: string, name: string): Result<Category> {
    if (!id) {
      return Result.fail<Category>('Título é obrigatório.')
    }

    if (!name) {
      return Result.fail<Category>('Descrição é obrigatória.')
    }

    return Result.ok<Category>(new Category(id, name))
  }
}
