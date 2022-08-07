import { Result } from 'shared/result'
import { City } from './city'
import { Email } from './email'
import { Name } from './name'
import { Password } from './password'
import { Phone } from './phone'

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
    const cityOrError = City.create(city, state)
    const passwordOrError = Password.create(password)
    const phoneOrError = Phone.create(phone)

    return Result<any>.combine([
      nameOrError,
      emailOrError,
      cityOrError,
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
      return Result.fail<User>(
        'Missing id. To create a new user call createWithoutId method.'
      )
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
