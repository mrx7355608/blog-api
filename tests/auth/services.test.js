import AuthServices from '../../src/services/auth.services.js'
import userDB from '../mocks/userDB.js'
import hashingServices from '../mocks/hashServices.js'
import createFakeUser from '../mocks/createFakeUser.js'

const authServices = AuthServices({ userDB, hashingServices })

describe('Auth Services Tests', function () {
    describe('Signup', function () {
        it('should return error on invalid email', async function () {
            try {
                const fakeUser = createFakeUser()
                await authServices.signup({
                    ...fakeUser,
                    confirmPassword: fakeUser.password,
                    email: 'lol'
                })
            } catch (err) {
                expect(err.message).toBe('Invalid email')
            }
        })

        it('should return error when first name is short', async function () {
            try {
                const fakeUser = createFakeUser()
                await authServices.signup({
                    ...fakeUser,
                    confirmPassword: fakeUser.password,
                    fname: 'l'
                })
            } catch (err) {
                expect(err.message).toBe('First name should be 3 characters long at least')
            }
        })

        it('should return error when last name is not given', async function () {
            try {
                const fakeUser = createFakeUser()
                delete fakeUser.lname
                await authServices.signup({
                    ...fakeUser,
                    confirmPassword: fakeUser.password,
                })
            } catch (err) {
                expect(err.message).toBe('Last name is required')
            }
        })

        it('should return error on null password', async function () {
            try {
                const fakeUser = createFakeUser()
                await authServices.signup({
                    ...fakeUser,
                    confirmPassword: fakeUser.password,
                    password: null 
                })
            } catch (err) {
                expect(err.message).toBe('Password should be a text value')
            }
        })

        it('should return error when password is not confirmed', async function () {
            try {
                const fakeUser = createFakeUser()
                await authServices.signup({
                    ...fakeUser,
                })
            } catch (err) {
                expect(err.message).toBe('Confirm your password to signup')
            }
        })

    })
})
