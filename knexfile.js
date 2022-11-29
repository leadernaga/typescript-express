'use strict'
// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const path = require('path')
const BASE_PATH = path.join(__dirname, 'src', 'models')
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'nagaapparaopolqamarasetti',
            password: 12345,
            database: 'employees',
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },
    test: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'nagaapparaopolqamarasetti',
            password: 12345,
            database: 'employees',
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds'),
        },
    },
}
