import passport from 'passport'
import { Strategy } from 'passport-local'

passport.use(
    new Strategy({ usernameField: 'email' }, async function (email, password, done) {
        // Check if user exists
        const user = await userDB.findByEmail(email)
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
