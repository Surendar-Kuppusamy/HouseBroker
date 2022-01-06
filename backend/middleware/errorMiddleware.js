import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { logger } from '../config/configLoggers.js'

const notFound = (req, res, next) => {
    let errMsg = "Not Found"+req.originalUrl;
    res.status(200).json({
        message: errMsg,
        status: 'error',
        code: 401
    });
}

const errorHandler = (err, req, res, next) => {
    console.log('Error Middleware==>'+err);
    if(err instanceof mongoose.Error.ValidationError) {
        let errorMessage = 'Something went wrong';
        Object.entries(err).forEach(([key, value]) => {
            if(key == 'errors') {
                Object.entries(value).every(([subkey, subvalue]) => {
                    errorMessage = subvalue.message;
                    if(errorMessage != 'Something went wrong') {
                        return false;
                    }
                });
            }
        });
        res.status(200).json({
            message: errorMessage,
            status: 'error',
            code: 500,
            mongosse:err
        });
    } else {
        res.status(statusCode).json({
            message: err.message,
            status: 'error',
            code: 500
        });
    }
}

export { notFound, errorHandler }