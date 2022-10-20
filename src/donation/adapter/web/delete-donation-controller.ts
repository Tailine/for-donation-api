import { AppError } from '@shared/appError'
import { Request, Response } from 'express'
import { DeleteDonationPort } from './../../application/port/delete-donation-port'
export class DeleteDonationController {
  constructor(private donationService: DeleteDonationPort) {}

  handle = async (request: Request, response: Response) => {
    const { id } = request.params

    if (!id) {
      return response.status(400).json({
        message: 'Doação não informada.'
      })
    }

    try {
      const result = await this.donationService.delete(id)
      if (result instanceof AppError) {
        console.log(result.message)
        return response.status(result.statusCode).json(result.message)
      }

      if (!result) {
        return response.status(400).json({
          message: 'Erro ao deletar doação.'
        })
      }
      return response.status(200).json({
        message: 'Doação removida com sucesso.'
      })
    } catch (err) {
      console.log(err)
      return response
        .status(500)
        .json({ message: 'Erro no servidor. Tente novamente mais tarde.' })
    }
  }
}
