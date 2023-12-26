import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('credential', (table: Knex.CreateTableBuilder): void => {
        table.string('username')
            .notNullable()
            .unique()
            .checkLength('>=', 3)
            .checkLength('<=', 20)
            .checkRegex('^[a-zA-Z0-9_]*$')
            .comment('The username of the user');
        table.string('email', 255)
            .notNullable()
            .unique()
            .checkLength('<=', 255)
            .checkLength('>=', 10)
            .comment('The email of the user');
        table.string('password')
            .notNullable()
            .comment('The password encrypt of the user');
        table.boolean('banned')
            .notNullable()
            .defaultTo(false)
            .comment('If the user is banned');
        table.uuid('uuid')
            .notNullable()
            .defaultTo(knex.raw('gen_random_uuid()'))
            .primary()
            .comment('The uuid of the credential');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('credential');
}

