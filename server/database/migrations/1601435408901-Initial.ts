import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1601435408901 implements MigrationInterface {
  name = "Initial1601435408901";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL, "date_updated" TIMESTAMP NOT NULL, "email" text, "name" text NOT NULL, "address" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
