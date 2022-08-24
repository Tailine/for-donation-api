import { IRegisterUser } from '@user/application/port/in/register-user-port'
import { User } from '@user/domain/user'

export class RegisterUserService implements IRegisterUser {
  constructor(private userRepository: UserRepository) {}

  execute(user: User) {
    return Promise.resolve(true)
  }
}
