var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var jwt = require('jsonwebtoken')

async function generateHash(password: string) {
    var hash = bcrypt.hashSync(password, salt)
    return hash
}

function verifyHash(password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
}

function generateJWT(email: string, username: string) {
    return jwt.sign({ data: { email, username } }, 'secret', {
        expiresIn: 60 * 60,
    })
}

function verifyJWT(token: string) {
    return jwt.verify(token, 'secret')
}

function allLetters(name: string = '') {
    let letters = /^[A-Za-z]+$/
    if (name.match(letters)) {
        return true
    }
    return false
}

module.exports = {
    allLetters,
    generateHash,
    verifyHash,
    generateJWT,
    verifyJWT,
}
