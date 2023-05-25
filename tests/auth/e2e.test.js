import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app.js'
import createFakeUser from '../mocks/createFakeUser.js'
import DBManager from '../../src/utils/DBManager.js'
import config from '../../config/index.js'

const agent = request(app)
const baseUrl = '/api/v1/auth'

describe('E2E Tests', function () {
    beforeAll(async function() {
        await DBManager.Connect(config.dbUrl)
    })
    afterAll(async function() {
        await DBManager.Disconnect()
    })

    const url = baseUrl + '/signup'

    describe('Signup', function () {
        it('should return error if user is already registered', async function () {
            const fakeUser = createFakeUser()
            const response = await agent.post(url)
                .send({
                    ...fakeUser,
                    email: 'Rosa.Thompson96@hotmail.com',
                    confirmPassword: fakeUser.password 
                })
                .expect(400)

            expect(response.body.error).toBe('User already exists')
        })

        it('should return error when no data is provided', async function () {
            const response = await agent.post(url)
                .send(null).expect(400)

            expect(response.body.error).toBe('No data is given')
        })

        it.skip('should create a new user', async function () {
            const fakeUser = createFakeUser()
            const response = await agent
                .post(url)
                .send({ 
                    ...fakeUser, confirmPassword: fakeUser.password 
                })

            console.log(response.body)
            expect(response.body.message).toBe('Thank you for signing up')
        })
    })
})
