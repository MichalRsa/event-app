import { MigrationInterface, QueryRunner } from "typeorm";

export class event1663232305199 implements MigrationInterface {
    name = 'event1663232305199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
