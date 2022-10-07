import { Result } from 'shared/result'

export class Category {
  private constructor(
    public readonly id: number,
    public readonly name: string
  ) {
    Object.freeze(this)
  }

  static create(id: number, name: string): Result<Category> {
    if (!id) {
      return Result.fail<Category>('Título é obrigatório.')
    }

    if (!name) {
      return Result.fail<Category>('Descrição é obrigatória.')
    }

    return Result.ok<Category>(new Category(id, name))
  }
}
