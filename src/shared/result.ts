export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: string
  private _value?: T

  constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error'
      )
    }

    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message'
      )
    }

    this.isSuccess = isSuccess
    this.error = error
    this.isFailure = !isSuccess
    this._value = value
    Object.freeze(this)
  }

  public getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`)
    }

    return this._value
  }

  public static fail<U>(error: string): Result<U> {
    return new Result(false, error)
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result
    }
    return Result.ok<any>(results)
  }
}
