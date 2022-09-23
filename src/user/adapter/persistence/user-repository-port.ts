import { UserData } from '@user/application/port/user-data'
import { User } from './user.entity'

export interface UserRepository {
  registerUser(user: UserData): Promise<UserData>
  findByEmail(email: string): Promise<User | null>
}
