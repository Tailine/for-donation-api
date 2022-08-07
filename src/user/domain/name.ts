import { Result } from 'shared/result'

export class Name {
  constructor(private readonly name: string) {
    Object.freeze(this)
  }

  static create(name: string): Result<Name> {
    if (!name) {
      return Result.fail<Name>('Nome é obrigatório.')
    }

    if (name.length === 1) {
      return Result.fail<Name>('Nome deve conter pelo menos 2 caracteres.')
    }

    return Result.ok<Name>(new Name(name))
  }
}
