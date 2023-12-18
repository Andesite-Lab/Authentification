import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('role', (table: Knex.CreateTableBuilder): void => {
        table.string('role', 16)
            .notNullable()
            .unique()
            .comment('The role name (he contain several permission thanks to role_permission table)');
        table.timestamp('createdAt')
            .notNullable()
            .defaultTo(knex.fn.now())
            .comment('The creation date of the role');
        table.timestamp('updatedAt')
            .nullable()
            .defaultTo(knex.fn.now())
            .comment('The last update date of the role');
        table.increments('id')
            .primary()
            .comment('The id of the role');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('role');
}
