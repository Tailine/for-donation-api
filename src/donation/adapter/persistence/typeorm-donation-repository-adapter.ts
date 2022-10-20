import { Category } from '@category/adapter/persistence/category.entity'
import { postgresDataSource } from '@config/typeorm'
import { User } from '@user/adapter/persistence/user.entity'
import { Repository } from 'typeorm'
import { NewDonation, DonationRepository } from './donation-repository-port'
import { Donation } from './donation.entity'

export class TypeormDonationRepository implements DonationRepository {
  private readonly donationRepository: Repository<Donation>

  constructor() {
    this.donationRepository = postgresDataSource.getRepository(Donation)
  }

  async createDonation(
    donationData: NewDonation,
    userId: string
  ): Promise<Donation> {
    const { categoryId } = donationData
    const donation = TypeormDonationRepository.createDonationEntity(
      donationData,
      userId,
      categoryId
    )
    const newDonation = await this.donationRepository.save(donation)
    return newDonation
  }

  async findAll(): Promise<Donation[]> {
    return await this.donationRepository.find({
      relations: {
        category: true
      }
    })
  }

  async findById(id: string): Promise<Donation | null> {
    return this.donationRepository.findOne({
      where: { id },
      relations: { category: true }
    })
  }

  async delete(id: string): Promise<boolean> {
    const affectedRows = (await this.donationRepository.delete({ id })).affected
    const hasDeleted = Boolean(affectedRows)
    return hasDeleted
  }

  static createDonationEntity(
    donationData: NewDonation,
    userId: string,
    categoryId: number
  ): Donation {
    const category = new Category()
    category.id = categoryId

    const user = new User()
    user.id = userId

    const donation = new Donation()
    donation.category = category
    donation.user = user
    donation.images = donationData.images
    donation.email = donationData.email
    donation.description = donationData.description
    donation.phone = donationData.phone
    donation.title = donationData.title

    return donation
  }
}
