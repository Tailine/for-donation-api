import { DonationRepository } from '@donation/adapter/persistence/donation-repository-port'
import { ImageStorage } from '@external-libraries/supabase-storage/image-storage'
import { AppError } from '@shared/appError'
import { DeleteDonationPort } from '../port/delete-donation-port'

export class DeleteDonationService implements DeleteDonationPort {
  constructor(
    private donationRepository: DonationRepository,
    private imageStorage: ImageStorage
  ) {}

  async delete(id: string): Promise<boolean | AppError> {
    const donation = await this.donationRepository.findById(id)
    if (!donation) {
      return new AppError('Doação não existe.', 404)
    }

    const paths = []
    for (const image of donation.images) {
      const [, path] = image.split('donations/')
      paths.push(path)
    }

    const hasDeleted = await this.imageStorage.delete(paths)
    if (hasDeleted) {
      return this.donationRepository.delete(id)
    }
    return hasDeleted
  }
}
