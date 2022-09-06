import { City } from './city'
import { State } from './state'

export interface PlaceQuery {
  getStates(): Promise<State[]>
  getCities(stateId: string): Promise<City[]>
}
