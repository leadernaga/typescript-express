import { Router, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
const utils = require('../../utils/utils')
const employeesControllers = require('../../controllers/employeeControllers/employeeController')
var createError = require('http-errors')

const route = Router()

route.post('/', async (req, res) => {
    const { username, password, name, email } = req.body

    try {
        if (!username || !password || !utils.allLetters(name) || !email) {
            return res.status(400).send('please enter a valid details')
        }

        const data = await employeesControllers.signupUser(req.body)

        if (data.message !== 'success') {
            console.log(data)
            return res.status(403).send({ message: data.message })
        }

        res.status(200).send(data.message)
    } catch (err) {
        console.log(err)
        res.send(createError(500, 'something went wrong try again'))
    }
})

module.exports = route
