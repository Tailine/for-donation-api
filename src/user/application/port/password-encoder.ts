export interface PasswordEncoder {
  hash(textPassword: string): Promise<string>
  compare(textPassword: string, passwordHash: string): Promise<boolean>
}
