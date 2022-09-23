import { postgresDataSource } from '@config/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user-repository-port'
import { Repository } from 'typeorm'
import { UserData } from '@user/application/port/user-data'

export class TypeormUserRepository implements UserRepository {
  private readonly userRepository: Repository<User>

  constructor() {
    this.userRepository = postgresDataSource.getRepository(User)
  }

  async registerUser(user: UserData): Promise<UserData> {
    return this.userRepository.save(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email })
  }
}
