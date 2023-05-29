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

  describe('POST /auth/signup', function () {
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

      expect(response.body.message).toBe('Thank you for signing up')
    })
  })

  describe('POST /auth/login', function () {
    it('should return error on invalid creds', async function () {
      const response = await agent.post('/api/v1/auth/login').send({
        email: 'fawad@gmail.com',
        password: '12312312312'
      })

      expect(response.body.error).toBe('Incorrect email or password')
    }) 

    it('should login user and should not return any sensitive data', async function () {
      const response = await agent.post('/api/v1/auth/login').send({
        email: 'fawad@gmail.com',
        password: 'fawadimran101010'
      }).expect(200)

      expect(response.body.user).toEqual({
        id: expect.any(String),
        fullname: expect.any(String),
        photo: expect.any(String),
      })
    }) 

  })

  describe('POST /auth/logout', function () {
    it('should return error if user is not logged in, but tries to logout', async function () {
      const response = await agent.post('/api/v1/auth/logout').expect(401)
      expect(response.body.error).toBe('You must login first')
    }) 

    it('should logout user', async function () {
      // Login user before logging out
      const response1 = await agent.post('/api/v1/auth/login').send({
        email: 'fawad@gmail.com',
        password: 'fawadimran101010'
      })
      const cookies = response1.headers['set-cookie']
      
      // Logout
      const response2 = await agent.post('/api/v1/auth/logout').set('Cookie', cookies).expect(200)
      expect(response2.body.logout).toBe('success')
    })
  })
})
