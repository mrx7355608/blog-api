import authDataValidator from '../validators/auth.validators.js'
import ApiError from '../utils/ApiError.js'

export default function AuthServices ({ usersDB, hashingServices }) {
    
    // SIGNUP
    async function signup(userData) {
        // Validate user data
        authDataValidator(userData)

        const { email, password } = userData

        // Check if user exists
        const user = await usersDB.findByEmail(email)
        if (user) {
            throw new ApiError('User already exists', 400)
        }

        // Hash password
        const hashedPassword = await hashingServices.hash(password)
        
        // Create a new user
        const newUser = await usersDB.insert({ 
            ...userData,
            password: hashedPassword
        })
        return newUser
    }

    return { signup }
}
