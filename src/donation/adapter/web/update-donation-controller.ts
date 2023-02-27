import { UpdateDonationUseCase } from '@donation/application/port/update-donation-use-case'
import { Request, Response } from 'express'

type UpdateRequestBody = {
  userId: string
  title: string
  email: string
  phone: string
  description: string
  images: Express.Multer.File[]
  categoryId: number
}

export class UpdateDonationController {
  constructor(private updateDonationUseCase: UpdateDonationUseCase) {}

  handle = async (request: Request, response: Response) => {
    const { categoryId, description, email, phone, title, userId } =
      request.body as UpdateRequestBody
    const { id } = request.params

    if (
      !id ||
      !categoryId ||
      !description ||
      !email ||
      !request.files ||
      !phone ||
      !title ||
      !userId
    ) {
      return response.status(400).json({
        message:
          'Todos os dados são obrigatórios. Verifique os dados inseridos.'
      })
    }

    if (!UpdateDonationController.areFilesObjectArray(request.files)) {
      return response.status(400).json({
        message: 'Favor enviar uma lista de imagens.'
      })
    }

    if (isNaN(Number(categoryId))) {
      return response.status(400).json({ message: 'Categoria inválida.' })
    }

    try {
      const donationData = this.updateDonationUseCase.execute({
        categoryId,
        description,
        email,
        phone,
        title,
        userId,
        images: request.files,
        id
      })

      return response.status(200).json({})
    } catch {
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
