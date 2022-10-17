import { Donation } from '../../../donation/adapter/persistence/donation.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Donation, (donation) => donation.category)
  donation: Donation
}
