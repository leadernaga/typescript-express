const knexfile = require('../../config/connection')
const utils = require('../../utils/utils')

async function signupUser({ name, email, password, username }: any) {
    try {
        const hash = await utils.generateHash(password)

        await knexfile
            .insert({ name, username, email, password: hash })
            .into('employees')

        return { message: 'success' }
    } catch (err: any) {
        const message = err.detail.split('Key')
        return { message: message[1] }
    }
}

async function LoginUser(email: string, password: string) {
    if (!password || !email) {
        return { message: 'please provide valid details' }
    }

    try {
        let data = await knexfile
            .select('*')
            .where('email', email)
            .from('employees')

        // console.log(data)
        if (!data[0].name || !utils.verifyHash(password, data[0].password)) {
            return { message: 'username or password is incorrect' }
        }
        const token = utils.generateJWT(email, data.username)
        return { message: 'success', token: token }

        console.log(data)
    } catch (err) {
        console.log(err)
        return { message: err }
    }
}
module.exports = { signupUser, LoginUser }
