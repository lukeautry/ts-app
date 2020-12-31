import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1607224797761 implements MigrationInterface {
  name = "Initial1607224797761";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL, "date_updated" TIMESTAMP NOT NULL, "email" text NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_passwords" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL, "date_updated" TIMESTAMP NOT NULL, "hash" text NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "REL_69bf155ad044d776976470eb03" UNIQUE ("user_id"), CONSTRAINT "PK_4244bafe3ae2988e7bb7af61268" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "verification_tokens_type_enum" AS ENUM('reset_password')`
    );
    await queryRunner.query(
      `CREATE TABLE "verification_tokens" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL, "date_updated" TIMESTAMP NOT NULL, "value" text NOT NULL, "date_expires" TIMESTAMP NOT NULL, "consumed" boolean NOT NULL, "type" "verification_tokens_type_enum" NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_f2d4d7a2aa57ef199e61567db22" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_passwords" ADD CONSTRAINT "FK_69bf155ad044d776976470eb032" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "verification_tokens" ADD CONSTRAINT "FK_31d2079dc4079b80517d31cf4f2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "verification_tokens" DROP CONSTRAINT "FK_31d2079dc4079b80517d31cf4f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_passwords" DROP CONSTRAINT "FK_69bf155ad044d776976470eb032"`
    );
    await queryRunner.query(`DROP TABLE "verification_tokens"`);
    await queryRunner.query(`DROP TYPE "verification_tokens_type_enum"`);
    await queryRunner.query(`DROP TABLE "user_passwords"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
