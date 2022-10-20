import { AppError } from '@shared/appError'

export interface DeleteDonationPort {
  delete(id: string): Promise<boolean | AppError>
}
