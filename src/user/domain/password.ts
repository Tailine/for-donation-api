import { Result } from 'shared/result'

export class Password {
  constructor(private readonly password: string) {
    Object.freeze(this)
  }

  static create(password: string): Result<Password> {
    if (!password) {
      return Result.fail<Password>('Senha não pode ser vazia.')
    }

    const passWithCapitalLetterEightLenSpecialCharacterNumber =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/

    console.log(
      'MATCH',
      password,
      passWithCapitalLetterEightLenSpecialCharacterNumber.test(password)
    )
    if (!passWithCapitalLetterEightLenSpecialCharacterNumber.test(password)) {
      return Result.fail<Password>(
        'Senha deve conter pelo menos 8 caracteres e ter pelo menos um número.'
      )
    }

    return Result.ok<Password>(new Password(password))
  }
}
