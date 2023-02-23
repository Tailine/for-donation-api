import { makeCategoryController } from '@category/factories/makeCategoryController'
import { Router } from 'express'

const categoryRoutes = Router()

categoryRoutes.get('/', makeCategoryController().execute)

export { categoryRoutes }
