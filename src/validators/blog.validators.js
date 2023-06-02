import joi from 'joi';
import ApiError from '../utils/ApiError.js';

const blogValidationSchema = joi.object({
    title: joi.string().min(10).max(100).required().messages({
        'any.required': 'Blog title is required',
        'string.empty': 'Blog title cannot be empty',
        'string.min': 'Blog title should be 10 characters long at least',
        'string.max': 'Blog title cannot be longer than 100 characters',
        'string.base': 'Blog title should be a text value',
    }),
    body: joi.string().min(100).max(1000).required().messages({
        'any.required': 'Blog body is required',
        'string.empty': 'Blog body cannot be empty',
        'string.min': 'Blog body should be 100 characters long at least',
        'string.max': 'Blog body cannot be longer than 1000 characters',
        'string.base': 'Blog body should be a text value',
    }),
    tags: joi
        .array()
        .min(1)
        .max(10)
        .items(
            joi.string().messages({
                'string.base': 'Blog tag should be a text value',
            })
        )
        .required()
        .messages({
            'any.required': 'Blog tags is required',
            'array.empty': 'Blog tags cannot be empty',
            'array.min': 'Blog should have at least 1 tag',
            'array.max': 'A blog cannot have more than 10 tags',
            'array.base': 'Blog tags should be a text value',
        }),
    author: joi.string().required().messages({
        'any.required': 'Blog author is required',
        'string.empty': 'Blog author cannot be empty',
        'string.base': 'Blog author should be a text value',
    }),
    slug: joi.string().required().messages({
        'any.required': 'Blog slug is required',
        'string.base': 'Blog slug should be a text value',
    }),
    coverPhoto: joi.string().required().messages({
        'any.required': 'Blog cover photo is required',
        'string.base': 'Blog cover photo should be a valid url',
    }),
});

function blogDataValidator(data) {
    const { error } = blogValidationSchema.validate(data);
    if (error) throw new ApiError(error.message, 400);
}

export default blogDataValidator
