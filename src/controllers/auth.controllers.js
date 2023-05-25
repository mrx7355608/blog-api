import AuthServices from '../services/auth.services.js'
import usersDB from '../data-access/user.data.js'
import ApiError from '../utils/ApiError.js'
import HashingServices from '../services/hash.services.js'

const hashingServices = HashingServices()
const authServices = AuthServices({ usersDB, hashingServices })

export default function AuthControllers() {
    // SIGNUP 
    async function signup(httpRequestObject) {
        const data = httpRequestObject.body

        if (!data || Object.keys(data).length < 1) {
            throw new ApiError('No data is given', 400)
        }

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
        passport.authenticate('local', function (err, user, info) {
            if (err) throw new ApiError('Something went wrong', 500)
            if (!user) throw new ApiError('User does not exist', 404)
            if (info) throw new ApiError(info.message, 400)

            req.login(function (err) {
                if (err) throw new ApiError('Something went wrong', 500)
                return res.status(200).json({ user })
            })
        })
    }

    // LOGOUT (passportjs)
    async function logout(req, res) {
        req.logout(function (err) {
            if (err) throw new ApiError('Something went wrong', 500)
            return res.status(200).json({
                logout: 'success'
            })
        })
    }

    return {
        signup,
        login,
        logout
    }
}
