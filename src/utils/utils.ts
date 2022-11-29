function allLetters(name: string = '') {
    let letters = /^[A-Za-z]+$/
    if (name.match(letters)) {
        return true
    }
    return false
}

module.exports = { allLetters }
