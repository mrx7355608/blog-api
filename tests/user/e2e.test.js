import 'dotenv/config'
import request from 'supertest'
import app from '../../src/app.js'
import config from '../../config/index.js'
import DBManager from '../../src/utils/DBManager.js'

const agent = request(app)


describe('User E2E Tests', function () {
  let cookies;

  beforeAll(async function () {
    // Connect to database
    await DBManager.Connect(config.dbUrl)

    // Login before making requests
    const resp = await agent.post('/api/v1/auth/login').send({
      email: 'fawad@gmail.com',
      password: 'fawadimran101010'
    }).expect(200)

    // Set cookies
    cookies = resp.headers['set-cookie'][0]
  })

  afterAll(async function () {
    await DBManager.Disconnect()
  })

  it('should not allow un-authorized requests', async function () {
    // No cookies are set so this request will pass the test
    const resp = await agent.get('/api/v1/user/profile').expect(401)
    expect(resp.body.error).toBe('You must login first')
  })

  describe("GET /user", function () {
    it('should not return any sensitive user data', async function () {
      const resp = await agent.get('/api/v1/user/profile')
        .set('Cookie', cookies)
        .expect(200)

      expect(resp.body.user).toEqual({
        facebook: expect.any(String),
        instagram: expect.any(String),
        twitter: expect.any(String),
        linkedIn: expect.any(String),
        id: expect.any(String),
        bio: expect.any(String),
        fullname: expect.any(String),
        photo: expect.any(String),
        writingCategories: expect.any(Array),
        joinedOn: expect.any(String)
      })
    })
  })

  describe("PATCH /user/update", function () {
    it('should validate data before updating', async function () {
      const response = await agent.patch('/api/v1/user/update')
        .set('Cookie',cookies).send({
          bio: null,
          writingCategories: [],
        }).expect(400)

      expect(response.body.error).toBe('Bio can only be text')
    })

    it('should update the user', async function () {
      const response = await agent.patch('/api/v1/user/update')
        .set('Cookie', cookies)
        .send({
          facebook: 'https://www.facebook.com',
          twitter: 'https://www.twitter.com',
          writingCategories: ['Tech', 'Sports', 'Politics'],
        })
        .expect(200)

      expect(response.body.user).toEqual({
        facebook: 'https://www.facebook.com',
        twitter: 'https://www.twitter.com',
        writingCategories: ['Tech', 'Sports', 'Politics'],
        id: expect.any(String),
        instagram: expect.any(String),
        linkedIn: expect.any(String),
        bio: expect.any(String),
        photo: expect.any(String),
        fullname: expect.any(String),
        joinedOn: expect.any(String),
      })
    })
  })
})

