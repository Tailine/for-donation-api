import { Request, Response } from 'express'
import { PlaceQuery } from './../application/ports/place-query'

export class PlaceController {
  constructor(private placeQueryService: PlaceQuery) {}

  handleState = async (_: Request, response: Response) => {
    try {
      const states = await this.placeQueryService.getStates()
      return response.status(200).json(states)
    } catch (err) {
      console.log({ err })
      return response.status(500).json({
        message: 'Erro no servidor, tente novamente mais tarde'
      })
    }
  }

  handleCities = async (request: Request, response: Response) => {
    try {
      const stateId = request.params.stateId

      if (!stateId) {
        return response
          .status(400)
          .json({ message: 'Por favor, informe o estado correspondente' })
      }

      const cities = await this.placeQueryService.getCities(stateId)
      return response.status(200).json(cities)
    } catch (err) {
      return response.status(500).json({
        message: 'Erro no servidor, tente novamente mais tarde'
      })
    }
  }
}
