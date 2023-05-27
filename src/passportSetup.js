import passport from 'passport'
import { Strategy } from 'passport-local'
import usersDB from './data-access/user.data.js'
import HashServices from './services/hash.services.js'

const hashServices = HashServices()

passport.use(
    new Strategy({ usernameField: 'email' }, async function (email, password, done) {
        // Check if user exists
        const user = await usersDB.findByEmail(email)
        if (!user) return done(null, false)

        // Check if passowrds match
        const isValidPassword = await hashServices.compare(password, user.password)
        if (!isValidPassword) {
            return done(null, true, { message: 'Incorrect email or password' })
        }

        return done(null, user)
    })
)

passport.serializeUser(function (user, done) {
    return done(null, user.id)
})
passport.deserializeUser(async function (id, done) {
    const user = await usersDB.findById(id)
    return done(null, user)
})
