import { CategoryRepository } from '@category/adapter/persistence/category-repository'
import { DonationRepository } from '@donation/adapter/persistence/donation-repository-port'
import { Donation as DonationEntity } from '@donation/adapter/persistence/donation.entity'
import { Donation } from '@donation/domain/donation'
import { ImageStorage } from '@external-libraries/supabase-storage/image-storage'
import { AppError } from '@shared/appError'
import { UserRepository } from '@user/adapter/persistence/user-repository-port'
import {
  UpdateDonationData,
  UpdateDonationUseCase
} from '../port/update-donation-use-case'

export class UpdateDonationService implements UpdateDonationUseCase {
  constructor(
    private donationRepository: DonationRepository,
    private userRepository: UserRepository,
    private categoryRepository: CategoryRepository,
    private imageStorage: ImageStorage
  ) {}

  async execute(data: UpdateDonationData): Promise<DonationEntity | AppError> {
    const { title, categoryId, description, email, id, images, phone, userId } =
      data

    const user = await this.donationRepository.findById(userId)
    if (!user) {
      return new AppError('Usuária não encontrada.')
    }

    const donationDbData = await this.donationRepository.findById(id)
    if (!donationDbData) {
      return new AppError('Doação não encontrada.')
    }

    const category = await this.categoryRepository.findById(categoryId)
    if (!category) {
      return new AppError('Categoria não existe.')
    }

    const updatedImageNames = images.map((img) => img.originalname)
    const donationOrError = Donation.create(
      title,
      email,
      phone,
      description,
      category.id,
      category.name,
      updatedImageNames
    )
    if (donationOrError.isFailure) {
      return new AppError(donationOrError.error ?? '')
    }

    // const result = await this.imageStorage.listImageByUser(userId)
    // if (result.error) {
    //   return new AppError('Erro ao recuperar imagens.')
    // }

    const updatedDonation = donationOrError.getValue()!

    // const dbFilenames = donationDbData.images.map(this.extractFilename)
    // const dbFilenamesDic = this.generateDic(dbFilenames)
    // const updatedImageNamesDic = this.generateDic(updatedImageNames)
    const { imgToDelete, imgToUpload } = this.getImagesForDeleteAndUpload(
      donationDbData.images,
      updatedImageNames
    )
    console.log({ imgToDelete, imgToUpload })
    /**
     * db donation
     * - donations/7a937a0f-a6c7-4ff6-b789-ab9631490943/erwan-hesry-pm3O5KxWKtw-unsplash.jpg
     * - donations/7a937a0f-a6c7-4ff6-b789-ab9631490943/discord_wallpaper.jpeg
     */
    // db donation

    return Promise.resolve({} as DonationEntity)
    // this.imageStorage.update(result.data ?? [], data.images)
  }

  private extractFilename(img: string) {
    const [, , filename] = img.split('/')
    return filename
  }

  private generateDic(list: string[]) {
    const dic = new Map<string, string>()
    for (const item of list) {
      dic.set(item, item)
    }
    return dic
  }

  private getImagesForDeleteAndUpload(
    dbImages: string[],
    inputImages: string[]
  ): {
    imgToDelete: Map<string, string>
    imgToUpload: Map<string, string>
  } {
    const dbFilenames = dbImages.map(this.extractFilename)
    const dbFilenamesDic = this.generateDic(dbFilenames)
    const updatedImageNamesDic = this.generateDic(inputImages)
    for (const filename of dbFilenames) {
      if (updatedImageNamesDic.has(filename)) {
        updatedImageNamesDic.delete(filename) // to upload
        dbFilenamesDic.delete(filename) // to delete
      }
    }

    return {
      imgToDelete: dbFilenamesDic,
      imgToUpload: updatedImageNamesDic
    }
  }
}
