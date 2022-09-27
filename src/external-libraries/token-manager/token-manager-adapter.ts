import { TokenManager } from './token-manager-port'
import jwt from 'jsonwebtoken'

export class JwtTokenManager implements TokenManager {
  private readonly secret: string = process.env.JWT_SECRET!

  sign(payload: Record<string, string>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: '7d'
    })
  }
}
