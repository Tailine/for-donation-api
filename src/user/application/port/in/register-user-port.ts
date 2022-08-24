import { User } from '../../../domain/user'

export interface IRegisterUser {
  execute(user: User): Promise<boolean>
}
