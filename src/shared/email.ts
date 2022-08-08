import { Result } from './result'

export class Email {
  constructor(private readonly email: string) {
    Object.freeze(this)
  }

  static create(email: string): Result<Email> {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email) {
      return Result.fail<Email>('Email não informado.')
    }

    if (!email.match(emailRegex)) {
      return Result.fail<Email>('Email inválido.')
    }

    return Result.ok<Email>(new Email(email))
  }
}
