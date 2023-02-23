import { Category } from './../../../category/adapter/persistence/category.entity'
import { categories } from '../../categories'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedCategory1673910678002 implements MigrationInterface {
  name = 'SeedCategory1673910678002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const category of categories) {
      await queryRunner.manager.save(Category, category)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('category')
  }
}
