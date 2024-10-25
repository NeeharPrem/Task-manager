import logs from '../Utils/logs.js';

export class CustomError extends Error {
    constructor(message, statusCode, code, details = []) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export const errorHandler = (err, req, res, next) => {
    logs.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: {
                message: err.message,
                code: err.code
            }
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            error: {
                message: 'Duplicate value error',
                code: 'DUPLICATE_ERROR',
                field: Object.keys(err.keyValue)[0]
            }
        });
    }

    if (err.name === 'Validation failed') {
        return res.status(400).json({
            error: {
                message: 'Validation error',
                code: 'VALIDATION_ERROR1',
                details: Object.values(err.errors).map(e => e.message)
            }
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: {
                message: 'Invalid token',
                code: 'INVALID_TOKEN'
            }
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: {
                message: 'Token expired',
                code: 'TOKEN_EXPIRED'
            }
        });
    }

    res.status(500).json({
        error: {
            message: 'Internal server error',
            code: 'INTERNAL_ERROR'
        }
    });
};