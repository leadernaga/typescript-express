/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('employees', (table) => {
        table.increments(),
            table.string('name').notNullable(),
            table.string('username').notNullable().unique(),
            table.string('email').notNullable().unique(),
            table.string('password').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('employees')
}
