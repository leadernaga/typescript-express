import request from 'supertest'
import app from '../../index'
import sinon from 'sinon'
const query = require('../../controllers/userController/userControllers')

describe('user', () => {
    afterEach(() => {
        sinon.restore()
    })

    describe('/get', () => {
        it('should give users', async () => {
            sinon.stub(query, 'getAllusers').resolves([])
            const response: any = await request(app).get('/user')
            expect(response.status).toBe(200)
            expect(response.body).toEqual({ data: [] })
            // expect(response.headers['content-type']).toMatch('json')
        })

        it('should give users', async () => {
            sinon
                .stub(query, 'getAllusers')
                .rejects('something happened internally')
            const response: any = await request(app).get('/user')
            expect(response.status).toBe(500)
            expect(response.error.text).toBe('something happened internally')
            // expect(response.headers['content-type']).toMatch('json')
        })

        it('/:id get should give perticular user ', async () => {
            const response: any = await request(app).get('/user/5')
            // expect(response.status).toBe(200)
            expect(response.body).toEqual({
                data: [{ id: '5', name: 'mama', age: 40 }],
            })
        })

        it('/:id get, on rejects should give an error ', async () => {
            sinon
                .stub(query, 'getSingleUserById')
                .rejects('something happened internally')
            const response: any = await request(app).get('/user/5')
            // expect(response.status).toBe(200)
            expect(response.error.text).toBe('something happened internally')
        })
    })

    describe('/post', () => {
        it('should able to post users', async () => {
            sinon.stub(query, 'postUsers').resolves({ message: 'success' })
            const response: any = await request(app)
                .post('/user')
                .send({ name: 'rajesh', age: 40 })

            expect(response.body.message).toBe('success')
        })

        it('on empty fields should fail', async () => {
            const response: any = await request(app).post('/user').send()

            expect(response.status).toBe(400)
            expect(response.body.message).toMatch('please enter every field')
        })

        it('on reject should give error', async () => {
            sinon
                .stub(query, 'postUsers')
                .rejects('something happened internally')

            const response: any = await request(app)
                .post('/user')
                .send({ name: 'rajesh', age: 5 })
            expect(response.status).toBe(500)
            expect(response.error.text).toMatch('something happened internally')
            // expect(response.body.name).toMatch('something happened internall')
        })
    })
})
