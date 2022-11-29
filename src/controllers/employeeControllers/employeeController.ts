const knexfile = require('../../config/connection')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

async function signupUser({ name, email, password, username }: any) {
    try {
        var hash = bcrypt.hashSync(password, salt)

        await knexfile
            .insert({ name, username, email, password: hash })
            .into('employees')

        return { message: 'success' }
    } catch (err) {
        return { message: 'unsuccess' }
    }
}

module.exports = { signupUser }
