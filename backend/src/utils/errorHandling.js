import { ZodError } from 'zod';
import { NotFound, UnAuthorize, ValidationError } from '../utils/error.js';
import { fromError } from 'zod-validation-error';
import jwt from 'jsonwebtoken';

export const errorHandling = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: fromError(err).toString()
      },
    });
  } else if (err instanceof ValidationError) {
    return res.status(err.statusCode || 400).json({
      success: false,
      error: {
        message: err.message
      },
    });
  } else if (err instanceof UnAuthorize) {
    return res.status(err.statusCode || 401).json({
      success: false,
      error: {
        message: err.message
      }
    });
  } else if(err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      error: {
        message: err.message
      }
    });
  } else if(err instanceof NotFound) {
    res.status(err.statusCode || 404).json({
      success: false,
      error: {
        message: err.message
      }
    });
  } else {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
      },
    });
  }
};
