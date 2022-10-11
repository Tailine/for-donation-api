import { MigrationInterface, QueryRunner } from 'typeorm'

export class DonationUserRelation1665528500275 implements MigrationInterface {
  name = 'DonationUserRelation1665528500275'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "donation"
            ADD "userId" uuid
        `)
    await queryRunner.query(`
            ALTER TABLE "donation"
            ADD CONSTRAINT "FK_063499388657e648418470a439a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "donation" DROP CONSTRAINT "FK_063499388657e648418470a439a"
        `)
    await queryRunner.query(`
            ALTER TABLE "donation" DROP COLUMN "userId"
        `)
  }
}
