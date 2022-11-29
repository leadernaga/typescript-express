import { Response, Request, Router } from 'express'
import { log } from '../../index'
const utils = require('../../utils/utils')

const userController = require('../../controllers/userControllers')
const route = Router()

route.get('/', async (req: Request, res: Response) => {
    log.info('here users')

    try {
        const data = await userController.getAllusers('users')
        res.status(200).send({ data: data })
    } catch (err) {
        res.status(500).send('something happened internally')
    }
})

route.get('/:id', async (req, res) => {
    try {
        const data = await userController.getSingleUserById(
            req.params.id,
            'users'
        )
        res.status(200).send({ data })
    } catch (err: any) {
        console.log(err, 'err')
        res.status(500).send('something happened internally')
    }
})

route.post('/', async (req: Request, res: Response) => {
    log.info('here in user route')

    const { name, age } = req.body

    try {
        if (!utils.allLetters(name) || !age) {
            return res.status(400).send({ message: 'please enter every field' })
        }

        const data = await userController.postUsers('users', { name, age })

        res.status(200).send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

export default route
