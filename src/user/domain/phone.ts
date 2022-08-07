import { Result } from 'shared/result'

export class Phone {
  constructor(private readonly phone: string) {
    Object.freeze(this)
  }

  static create(phone: string): Result<Phone> {
    if (!phone) {
      return Result.fail<Phone>('Número de telefone obrigatório.')
    }

    const PHONE_NUMBER_LEN = 11
    if (!(phone.length === PHONE_NUMBER_LEN)) {
      return Result.fail<Phone>(
        'Número de telefone incompleto. Verifique se o DDD foi incluído.'
      )
    }

    return Result.ok<Phone>(new Phone(phone))
  }
}
