import { MigrationInterface, QueryRunner } from 'typeorm'

export class DonationCategoryRelation1665528602447
  implements MigrationInterface
{
  name = 'DonationCategoryRelation1665528602447'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "donation"
            ADD "categoryId" integer
        `)
    await queryRunner.query(`
            ALTER TABLE "donation"
            ADD CONSTRAINT "UQ_ae52d669e4cabc6a7743e23de4a" UNIQUE ("categoryId")
        `)
    await queryRunner.query(`
            ALTER TABLE "donation"
            ADD CONSTRAINT "FK_ae52d669e4cabc6a7743e23de4a" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "donation" DROP CONSTRAINT "FK_ae52d669e4cabc6a7743e23de4a"
        `)
    await queryRunner.query(`
            ALTER TABLE "donation" DROP CONSTRAINT "UQ_ae52d669e4cabc6a7743e23de4a"
        `)
    await queryRunner.query(`
            ALTER TABLE "donation" DROP COLUMN "categoryId"
        `)
  }
}
