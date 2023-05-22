import joi from 'joi'
import ApiError from '../utils/ApiError.js'

const signupValidationSchema = joi.object({
    fname: joi.string().min(3).max(10).required().messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty',
        'string.min': 'First name should be 3 characters long at least',
        'string.max': 'First name cannot be longer than 10 characters',
        'string.base': 'First name should be a text',
    }),
    lname: joi.string().min(3).max(10).required().messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty',
        'string.min': 'Last name should be 3 characters long at least',
        'string.max': 'Last name cannot be longer than 10 characters',
        'string.base': 'Last name should be a text',
    }),
    email: joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.base': 'Email should be a text',
        'string.email': 'Invalid email',
    }),
    password: joi.string().min(10).max(30).required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password should be 10 characters long at least',
        'string.max': 'Password cannot be longer than 30 characters',
        'string.base': 'Password should be a text',
    }),
    confirmPassword: joi.valid(joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm your password to signup'
    })
})

function authDataValidator(data) {
    const { error } = signupValidationSchema.validate(data)
    if (error) throw new ApiError(error.message, 400)
}

export default authDataValidator
