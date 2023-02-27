import { TokenManager } from '@external-libraries/token-manager/token-manager-port'
import { AppError } from '@shared/appError'
import { NextFunction, Request, Response } from 'express'

export class Authorization {
  constructor(private tokenManager: TokenManager) {}

  verify = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies['access_token']
    if (!accessToken) {
      return res.status(403).json({ message: 'Acesso não autorizado.' })
    }

    const decodedTokenOrError = this.tokenManager.verify(accessToken)
    if (decodedTokenOrError instanceof AppError) {
      return res.status(403).json({ message: 'Acesso não autorizado.' })
    }

    req.id = decodedTokenOrError.userId
    next()
  }
}
