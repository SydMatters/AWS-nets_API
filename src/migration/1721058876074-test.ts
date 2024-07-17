import { MigrationInterface, QueryRunner } from "typeorm";

export class test1721058876074 implements MigrationInterface {
    name = 'test1721058876074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_741210c246defe00ed877a98f2a"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "access_level"`);
        await queryRunner.query(`DROP TYPE "public"."users_projects_access_level_enum"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`CREATE TYPE "public"."users_projects_accesslevel_enum" AS ENUM('30', '40', '50')`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "accessLevel" "public"."users_projects_accesslevel_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_7784abdb1d1df4de9504ad01c9c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_667c03d5a36e0f90056b3ecb393" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_667c03d5a36e0f90056b3ecb393"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP CONSTRAINT "FK_7784abdb1d1df4de9504ad01c9c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users_projects" DROP COLUMN "accessLevel"`);
        await queryRunner.query(`DROP TYPE "public"."users_projects_accesslevel_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "project_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "user_id" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."users_projects_access_level_enum" AS ENUM('40', '50')`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD "access_level" "public"."users_projects_access_level_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_741210c246defe00ed877a98f2a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
