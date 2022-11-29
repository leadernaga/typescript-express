import { Router, Response, Request } from 'express'
import jwt from 'jsonwebtoken'
const utils = require('../../utils/utils')
const employeesControllers = require('../../controllers/employeeControllers/employeeController')

const route = Router()

route.post('/', async (req, res) => {
    const { username, password, name, email } = req.body

    try {
        if (!username || !password || !utils.allLetters(name) || !email) {
            return res.status(400).send('please enter a valid details')
        }

        const data = await employeesControllers.signupUser(req.body);
           
        if(data.message!==)
 

    } catch (err) {

    }
})
