import AuthServices from '../services/auth.services.js'
import usersDB from '../data-access/user.data.js'
import ApiError from '../utils/ApiError.js'
import HashingServices from '../services/hash.services.js'
import passport from 'passport'

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
  async function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) return next(err)
      if (!user) return res.status(404).json({ error: 'User does not exist' })
      if (info) return res.status(400).json({ error: info.message })

      req.logIn(user, function (err) {
        if (err) return next(err)
        const userData = {
          fullname: user.fullname,
          photo: user.photo,
          id: user.id
        }
        return res.status(200).json({ user: userData })
      })
    })(req, res, next)
  }

  // LOGOUT (passportjs)
  async function logout(req, res, next) {
    req.logout(function (err) {
      if (err) return next(err)
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
