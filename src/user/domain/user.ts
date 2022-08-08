import { Email } from 'shared/email'
import { Phone } from 'shared/phone'
import { Result } from 'shared/result'
import { Name } from './name'
import { Password } from './password'

export class User {
  private constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly city: string,
    private readonly state: string,
    private readonly phone: string,
    private readonly password: string,
    private readonly id: string | null = null
  ) {
    Object.freeze(this)
  }

  private static validate(
    name: string,
    email: string,
    city: string,
    state: string,
    phone: string,
    password: string
  ) {
    const nameOrError = Name.create(name)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)
    const phoneOrError = Phone.create(phone)

    if (!city) {
      return Result.fail('Cidade não pode ser vazia.')
    }

    if (!state) {
      return Result.fail('Estado não pode ser vazio.')
    }

    return Result<any>.combine([
      nameOrError,
      emailOrError,
      passwordOrError,
      phoneOrError
    ])
  }

  static createWithoutId = (
    name: string,
    email: string,
    city: string,
    state: string,
    phone: string,
    password: string
  ): Result<User> => {
    const validation = this.validate(name, email, city, state, phone, password)

    if (validation.isFailure) {
      return Result.fail<User>(validation.error ?? '')
    }

    return Result.ok(new User(name, email, city, state, phone, password))
  }

  static createWithId(
    id: string,
    name: string,
    email: string,
    city: string,
    state: string,
    phone: string,
    password: string
  ): Result<User> {
    if (!id) {
      return Result.fail<User>('"id" não fornecido.')
    }

    const validation = this.validate(name, email, city, state, phone, password)
    if (validation.isFailure) {
      return Result.fail<User>(validation.error ?? '')
    }

    return Result.ok<User>(
      new User(name, email, city, state, phone, password, id)
    )
  }
}
