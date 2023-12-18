import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('credential_role', (table: Knex.CreateTableBuilder): void => {
        table.uuid('credentialUuid')
            .notNullable()
            .references('uuid')
            .inTable('credential')
            .onDelete('CASCADE')
            .comment('The uuid of the credential');
        table.integer('roleId')
            .notNullable().references('id')
            .inTable('role')
            .onDelete('CASCADE')
            .comment('The id of the role');
        table.increments('id')
            .primary()
            .comment('The id of user role');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('credential_role');
}
