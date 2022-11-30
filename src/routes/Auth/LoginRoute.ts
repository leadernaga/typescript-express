import { Router, Request, Response } from 'express'
const employeeController = require('../../controllers/employeeControllers/employeeController')
const route = Router()

route.get('/', async (req, res) => {
    const { email, password } = req.body

    try {
        const data = await employeeController.LoginUser(email, password)

        if (data.message !== 'success') {
            return res.status(400).send({ message: data.message })
        }

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports=route
