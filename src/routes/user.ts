import { SigninUserController } from './../user/adapter/signin-user-controller'
import { makeUserController } from '@user/factories/makeUserController'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/signup', makeUserController().handle)
userRoutes.get('/signin', SigninUserController.handle)

export { userRoutes }
