/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('employees').del()
    await knex('employees').insert([
        {
            name: 'naga',
            username: 'naga',
            email: 'naga@email.com',
            password: 'password',
        },
        {
            name: 'prudhvi',
            username: 'prudhvi',
            password: 'password',
            email: 'prudhvi@email.com',
        },
    ])
}
