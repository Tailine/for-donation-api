import { Email } from 'shared/email'
import { Phone } from 'shared/phone'
import { Result } from 'shared/result'
import { Category } from './category'

export class Donation {
  private constructor(
    private readonly title: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly description: string,
    private readonly images: string[],
    private readonly category: Category,
    private readonly id: string | null = null
  ) {
    Object.freeze(this)
  }

  static createWithoutId(
    title: string,
    email: string,
    phone: string,
    description: string,
    categoryId: string,
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

  static createWithId(
    id: string,
    title: string,
    email: string,
    phone: string,
    description: string,
    categoryId: string,
    categoryName: string,
    images: string[]
  ): Result<Donation> {
    if (!id) {
      return Result.fail<Donation>('"id" não fornecido.')
    }

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
}
