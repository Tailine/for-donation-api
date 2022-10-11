import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTables1665528307353 implements MigrationInterface {
  name = 'CreateTables1665528307353'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "category" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "donation" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "description" character varying NOT NULL,
                "images" text NOT NULL,
                CONSTRAINT "PK_25fb5a541964bc5cfc18fb13a82" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "city" character varying NOT NULL,
                "state" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `)
    await queryRunner.query(`
            DROP TABLE "donation"
        `)
    await queryRunner.query(`
            DROP TABLE "category"
        `)
  }
}
