import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registrationValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string() .min(2) .max(20) .required() .trim()
            .messages({
                'string.min': 'Username must be at least 2 characters long',
                'string.max': 'Username cannot exceed 20 characters',
                'any.required': 'Username is required'
            }),

        email: Joi.string() .email() .required() .trim()
            .messages({
                'string.email': 'Enter a valid email address',
                'any.required': 'Email is required'
            }),

        password: Joi.string() .pattern(passwordRegex) .required()
            .messages({
                'string.pattern.base': 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),

        role: Joi.string()
            .valid('user', 'admin')
            .default('user')
    });

    return schema.validate(data, { abortEarly: false });
};

export const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string() .email() .required() .trim()
            .messages({
                'string.email': 'Enter a valid email address',
                'any.required': 'Email is required'
            }),

        password: Joi.string() .required()
            .messages({
                'any.required': 'Password is required'
            })
    });

    return schema.validate(data, { abortEarly: false });
};