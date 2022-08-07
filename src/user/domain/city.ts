import { Result } from 'shared/result'

export class City {
  constructor(private readonly city: string, private readonly state: string) {
    Object.freeze(this)
  }

  static create(city: string, state: string): Result<City> {
    if (!city) {
      return Result.fail<City>('Cidade não pode ser vazia.')
    }

    if (!state) {
      return Result.fail<City>('Estado não pode ser vazio.')
    }

    return Result.ok<City>(new City(city, state))
  }
}
