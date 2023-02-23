import { Category } from './../../../category/adapter/persistence/category.entity'
import { User } from '../../../user/adapter/persistence/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  description: string

  @Column('simple-array')
  images: string[]

  @ManyToOne(() => User, (user) => user.donations)
  user: User

  @ManyToOne(() => Category)
  category: Category
}
