import { CreateDonationUseCase } from '@donation/application/port/create-donation-port'
import { AppError } from '@shared/appError'
import { Email } from '@shared/email'
import { Request, Response } from 'express'

type DonationRequestData = {
  userId: string
  title: string
  email: string
  phone: string
  description: string
  images: Express.Multer.File[]
  categoryId: string
}

export class CreateDonationController {
  constructor(private createDonationService: CreateDonationUseCase) {}

  handle = async (request: Request, response: Response) => {
    const { title, email, phone, description, categoryId, userId } =
      request.body

    console.log({
      body: request.body,
      files: request.files,
      file: request.file
    })
    const emailOrError = Email.create(email)
    if (emailOrError.isFailure) {
      return response.status(400).json({
        message: emailOrError.error
      })
    }

    if (
      !title ||
      !request.files ||
      !description ||
      !categoryId ||
      !userId ||
      !phone
    ) {
      return response.status(400).json({
        message:
          'Todos os dados são obrigatórios. Verifique os dados inseridos.'
      })
    }

    if (!CreateDonationController.areFilesObjectArray(request.files)) {
      return response.status(400).json({
        message: 'Favor enviar uma lista de imagens.'
      })
    }

    if (isNaN(Number(categoryId))) {
      return response.status(400).json({ message: 'Categoria inválida.' })
    }

    try {
      const resp = await this.createDonationService.execute(
        {
          title,
          email,
          phone,
          description,
          images: request.files,
          categoryId: Number(categoryId)
        },
        userId
      )

      console.log({ resp })

      if (resp instanceof AppError) {
        return response.status(resp.statusCode).json({ message: resp.message })
      }

      return response.status(201).json({ data: resp })
    } catch (err) {
      console.log(err)
      return response.status(500).json({
        message: 'Erro no servidor, tente novamente mais tarde'
      })
    }
  }

  static areFilesObjectArray(
    files:
      | Express.Multer.File[]
      | { [fieldname: string]: Express.Multer.File[] }
  ): files is Express.Multer.File[] {
    return Boolean((files as Express.Multer.File[]).length)
  }
}
