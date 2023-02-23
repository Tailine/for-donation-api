import { Email } from 'shared/email'
import { Phone } from 'shared/phone'
import { Result } from 'shared/result'
import { Category } from '../../category/domain/category'

export class Donation {
  private constructor(
    private readonly _title: string,
    private readonly _email: string,
    private readonly _phone: string,
    private readonly _description: string,
    private readonly _images: string[],
    private readonly _category: Category
  ) {
    Object.freeze(this)
  }

  static create(
    title: string,
    email: string,
    phone: string,
    description: string,
    categoryId: number,
    categoryName: string,
    images: string[]
  ): Result<Donation> {
    if (!title) {
      return Result.fail<Donation>('Título é obrigatório.')
    }

    if (!description) {
      return Result.fail<Donation>('Descrição é obrigatória.')
    }

    if (!images.length) {
      return Result.fail<Donation>('É necessário pelo menos uma imagem.')
    } else if (images.some((image) => !image)) {
      return Result.fail<Donation>('Uma ou mais imagens inválidas.')
    }

    const emailOrError = Email.create(email)
    const phoneOrError = Phone.create(phone)
    const categoryOrError = Category.create(categoryId, categoryName)
    const donationPropsResult = Result.combine([
      emailOrError,
      phoneOrError,
      categoryOrError
    ])

    if (donationPropsResult.isFailure) {
      return Result.fail(donationPropsResult.error ?? '')
    }

    return Result.ok<Donation>(
      new Donation(
        title,
        email,
        phone,
        description,
        images,
        categoryOrError.getValue()!
      )
    )
  }

  public get title() {
    return this._title
  }

  public get email() {
    return this._email
  }

  public get phone() {
    return this._phone
  }

  public get description() {
    return this._description
  }

  public get category() {
    return this._category
  }

  public get images() {
    return this._images
  }
}
