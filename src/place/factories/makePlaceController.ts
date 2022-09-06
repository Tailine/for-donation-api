import { PlaceController } from './../adapter/place-controller'
import { PlaceQueryService } from './../application/services/place-query-service'

export const makePlaceController = () => {
  const placeService = new PlaceQueryService()
  return new PlaceController(placeService)
}
