import { Donation } from '@donation/adapter/persistence/donation.entity'

export interface QueryDonationPort {
  getDonations(): Promise<Donation[]>
}
