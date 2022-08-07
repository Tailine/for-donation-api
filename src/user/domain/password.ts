import { Result } from 'shared/result'

export class Password {
  constructor(private readonly password: string) {
    Object.freeze(this)
  }

  static create(password: string): Result<Password> {
    if (!password) {
      return Result.fail<Password>('Password cannot be empty.')
    }

    const minimumEightLenOneLetterOneNumber =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!password.match(minimumEightLenOneLetterOneNumber)) {
      return Result.fail<Password>(
        'Password must be at least 8 characters long and have at least one number .'
      )
    }

    return Result.ok<Password>(new Password(password))
  }
}
