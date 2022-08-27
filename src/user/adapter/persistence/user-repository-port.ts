import { UserData } from '@user/application/port/user-data'

export interface UserRepository {
  registerUser(user: UserData): Promise<UserData>
}
