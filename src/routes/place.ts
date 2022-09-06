import { makePlaceController } from '@place/factories/makePlaceController'
import { Router } from 'express'

const placeRoutes = Router()

placeRoutes.get('/state', makePlaceController().handleState)
placeRoutes.get('/cities/:stateId', makePlaceController().handleCities)

export { placeRoutes }
