import { CategoryRepository } from '@category/adapter/persistence/category-repository'
import { DonationRepository } from '@donation/adapter/persistence/donation-repository-port'
import { Donation } from '@donation/adapter/persistence/donation.entity'
import { ImageStorage } from '@external-libraries/supabase-storage/image-storage'
import { AppError } from '@shared/appError'
import { UserRepository } from '@user/adapter/persistence/user-repository-port'
import { CreateDonationUseCase } from '../port/create-donation-port'
import { DonationData } from '../port/donation-data'

export class CreateDonationService implements CreateDonationUseCase {
  constructor(
    private userRepository: UserRepository,
    private donationRepository: DonationRepository,
    private categoryRepository: CategoryRepository,
    private imageStorage: ImageStorage
  ) {}

  async execute(
    donation: DonationData,
    userId: string
  ): Promise<Donation | AppError> {
    if (!(await this.userRepository.findById(userId))) {
      return new AppError('Usuário não existe.')
    }

    if (!(await this.categoryRepository.findById(donation.categoryId))) {
      return new AppError('Categoria não existe.')
    }

    const uploadedResult = await this.imageStorage.upload(
      userId,
      donation.images
    )

    const hasUploadFailed = uploadedResult.every((result) => result.error)
    if (hasUploadFailed) {
      return new AppError('Erro ao salvar imagens. Tente novamente mais tarde')
    }

    const uploadedImages = []
    for (const result of uploadedResult) {
      if (result.data) {
        const imageUrl = this.imageStorage.getImageUrl(result.data.Key)
        if (imageUrl) {
          uploadedImages.push(result.data.Key)
        }
      }
    }

    return this.donationRepository.createDonation(
      {
        ...donation,
        images: uploadedImages
      },
      userId
    )
  }
}
