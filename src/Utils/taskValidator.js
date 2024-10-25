import Joi from 'joi';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const validateTask = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required().trim()
            .messages({
                'string.min': 'Title must be at least 3 characters long',
                'string.max': 'Title cannot exceed 100 characters',
                'any.required': 'Title is required'
            }),

        description: Joi.string().max(500).required().trim()
            .messages({
                'string.max': 'Description cannot exceed 500 characters'
            }),

        duedate: Joi.date().optional()
            .messages({
                'date.base': 'Due date must be a valid date'
            }),

        priority: Joi.string().valid('low', 'medium', 'high').default('low')
            .messages({
                'any.only': 'Priority must be one of low, medium, or high'
            }),

        assignees: Joi.array().items(Joi.string().pattern(objectIdRegex))
            .optional()
            .messages({
                'array.includesRequiredUnknowns': 'Assignees must be valid ObjectIds'
            })
    });

    return schema.validate(data, { abortEarly: false });
};

export const validateEdit = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).optional().trim()
            .messages({
                'string.min': 'Title must be at least 3 characters long',
                'string.max': 'Title cannot exceed 100 characters',
                'any.required': 'Title is required'
            }),

        description: Joi.string().max(500).optional().trim()
            .messages({
                'string.max': 'Description cannot exceed 500 characters'
            }),

        dueDate: Joi.date().optional()
            .messages({
                'date.base': 'Due date must be a valid date'
            }),

        priority: Joi.string().optional().valid('low', 'medium', 'high').default('low')
            .messages({
                'any.only': 'Priority must be one of low, medium, or high'
            }),

        assignees: Joi.array().items(Joi.string().pattern(objectIdRegex))
            .optional()
            .messages({
                'array.includesRequiredUnknowns': 'Assignees must be valid ObjectIds'
            }),
    });

    return schema.validate(data, { abortEarly: false });
};