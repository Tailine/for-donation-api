import { DonationQueryPort } from '@donation/application/port/donation-query-port'
import { Request, Response } from 'express'

export class QueryDonationController {
  constructor(private donationService: DonationQueryPort) {}

  getAll = async (_: Request, response: Response) => {
    try {
      const donations = await this.donationService.getDonations()
      return response.status(200).json(donations)
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao buscar doações. Tente novamente mais tarde'
      })
    }
  }
}
