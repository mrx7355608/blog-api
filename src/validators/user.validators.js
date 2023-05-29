import joi from 'joi'
import ApiError from '../utils/ApiError.js'

const userValidationSchema = joi.object({
  facebook: joi.string().messages({
    'string.base': 'Link should only be a text value'
  }),
  
  twitter: joi.string().messages({
    'string.base': 'Link should only be a text value'
  }),
  
  instagram: joi.string().messages({
    'string.base': 'Link should only be a text value'
  }),
  
  linkedIn: joi.string().messages({
    'string.base': 'Link should only be a text value'
  }),

  bio: joi.string().min(10).max(200).messages({
    'string.min': 'Bio should be 10 characters long at least',
    'string.max': 'Bio can only be 200 characters long',
    'string.empty': 'Bio cannot be empty',
    'string.base': 'Bio can only be text',
  }),

  writingCategories: joi.array().items(joi.string()).required().messages({
    'any.required': 'Writing categories are required',
    'array.base': 'Writing categories can only be of type list',
  }),
})

function userDataValidator (data) {
  const { error } = userValidationSchema.validate(data)
  if (error) throw new ApiError(error.message, 400)
}

export default userDataValidator
