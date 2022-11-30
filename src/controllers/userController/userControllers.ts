const knex = require('../../config/connection')

interface dataType {
    name: string
    age: number
}

async function getAllusers(tablename: string) {
    return await knex.select('*').from(tablename)
}

async function postUsers(tablename: string, data: dataType) {
    try {
        await knex.insert(data).into(tablename)

        return { message: 'success' }
    } catch (err) {
        return { message: 'unsuccess' }
    }
}

async function getSingleUserById(id: number, tablename: string) {
    try {
        return knex.select('*').from(tablename).where('id', id)
        console.log('error')
    } catch (err) {
        return { message: 'unsuccessfull' }
    }
}

module.exports = { getAllusers, postUsers, getSingleUserById }
