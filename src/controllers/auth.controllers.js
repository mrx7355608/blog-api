import AuthServices from '../services/auth.services.js'
import usersDB from '../data-access/user.data.js'

const authServices = AuthServices({ usersDB })

export default function AuthControllers() {
    // SIGNUP 
    async function signup(httpRequestObject) {
        const data = httpRequestObject.body
        const userData = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        }

        await authServices.signup(userData)

        return {
            statusCode: 201,
            body: { message: 'Thank you for signing up' }
        }
    }
    
    // LOGIN (passportjs)
    async function login(req, res) {
    }

    // LOGOUT (passportjs)
    async function logout(req, res) {}
}
