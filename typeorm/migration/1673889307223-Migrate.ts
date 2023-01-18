import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1673889307223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [{
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            }, {
                name: "name",
                type: "varchar",
                length: "250"
            }, {
                name: "email",
                type: "varchar",
                length: "250"
            }, {
                name: "password",
                type: "varchar",
                length: "250"
            }, {
                name: "birthAt",
                type: "date",
                isNullable: true,
            }, {
                name: "createdAt",
                type: "datetime",
                isNullable: false,
                default: "CURRENT_TIMESTAMP()"
            }, {
                name: "updatedAt",
                type: "datetime",
                isNullable: false,
                default: "CURRENT_TIMESTAMP()"
            }, {
                name: "role",
                type: "int",
                default: "1"
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
// id int AI PK 
// name varchar(250) 
// email varchar(250) 
// password varchar(250) 
// birthAt datetime 
// createdAt datetime 
// updatedAt datetime 
// role int
