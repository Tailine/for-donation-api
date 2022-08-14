import { RegisterUserUseCase } from '@user/application/port/in/register-user-use-case'
import { User } from '@user/domain/user'

export class RegisterUserService implements RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(user: User) {
    return Promise.resolve(true)
  }
}
