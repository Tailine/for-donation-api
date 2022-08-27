import bcrypt from 'bcrypt'
import { PasswordEncoder } from '@user/application/port/password-encoder'

const SALT_ROUNDS = 10

export class BcryptEncoder implements PasswordEncoder {
  async hash(textPassword: string): Promise<string> {
    try {
      return bcrypt.hash(textPassword, SALT_ROUNDS)
    } catch (err) {
      throw Error(
        'Erro ao encriptar senha, por favor tente novamente mais tarde.'
      )
    }
  }

  async compare(textPassword: string, passwordHash: string): Promise<boolean> {
    try {
      return bcrypt.compare(textPassword, passwordHash)
    } catch (err) {
      throw Error(
        'Erro na comparação da senha, por favor tente novamente mais tarde.'
      )
    }
  }
}
