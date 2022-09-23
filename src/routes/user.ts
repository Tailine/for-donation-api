import { makeRegisterUserController } from '@user/factories/makeRegisterUserController'
import { Router } from 'express'
import { makeAuthUserController } from '@user/factories/makeAuthUserController'

const userRoutes = Router()

userRoutes.post('/signup', makeRegisterUserController().handle)
userRoutes.get('/signin', makeAuthUserController().handle)

export { userRoutes }
