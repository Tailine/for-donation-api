import { City } from '../ports/city'
import { PlaceQuery } from '../ports/place-query'
import { State } from '../ports/state'
import axios from 'axios'

type StateApi = {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

type CityApi = {
  id: number
  nome: string
}

export class PlaceQueryService implements PlaceQuery {
  async getStates(): Promise<State[]> {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    const data = (await axios.get(url)).data as StateApi[]
    const states = data.map(PlaceQueryService.convertToStateType)
    return states
  }

  async getCities(stateId: string): Promise<City[]> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
    const data = (await axios.get(url)).data as CityApi[]
    const cities = data.map(PlaceQueryService.convertToCityType)
    return cities
  }

  static convertToCityType(cityApi: CityApi): City {
    return {
      id: cityApi.id,
      name: cityApi.nome
    }
  }

  static convertToStateType(stateApi: StateApi): State {
    return {
      id: stateApi.id,
      acronym: stateApi.sigla,
      name: stateApi.nome,
      region: {
        id: stateApi.regiao.id,
        name: stateApi.regiao.nome,
        acronym: stateApi.regiao.sigla
      }
    }
  }
}
