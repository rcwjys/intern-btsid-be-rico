import { ZodError } from 'zod';
import { UnAuthorize, ValidationError } from '../utils/error.js';
import { fromError } from 'zod-validation-error';

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
  } else {
    return res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
      },
    });
  }
};
