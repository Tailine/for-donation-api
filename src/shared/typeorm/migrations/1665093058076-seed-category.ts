import { categories } from './../../categories'
import { Category } from './../../../category/adapter/persistence/category.entity'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class seedCategory1665093058076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          }
        ]
      })
    )

    for (const category of categories) {
      await queryRunner.manager.save(Category, category)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category')
  }
}
