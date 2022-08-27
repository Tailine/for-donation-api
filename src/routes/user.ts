import { makeUserController } from '@user/factories/makeUserController'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', makeUserController().handle)

export { userRoutes }
