import { RegisterUserController } from './../user/adapter/in/register-user-controller'
import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', RegisterUserController.execute)

export { userRoutes }
