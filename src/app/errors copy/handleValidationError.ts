import { Prisma } from '@prisma/client';
import { IGenericErrorResponse } from '../interface/common';

// Function to handle all Prisma errors
const handleValidationError = (
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError,
): IGenericErrorResponse => {
  let message = 'A database error occurred.';
  let statusCode = 500;
  let errors = [{ path: '', message: error.message }];

  // Handle PrismaClientKnownRequestError
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        message = 'Unique constraint violation.';
        errors = [
          {
            path: error.meta?.target?.toString() || 'unknown',
            message: `The field(s) ${error.meta?.target?.toString()} must be unique.`,
          },
        ];
        statusCode = 400;
        break;

      case 'P2003':
        message = 'Foreign key constraint failed.';
        errors = [
          {
            path: 'unknown',
            message: 'A related resource does not exist.',
          },
        ];
        statusCode = 400;
        break;

      case 'P2004':
        message = 'Constraint failed on a database field.';
        statusCode = 400;
        break;

      case 'P2025':
        // Add extra context if available from error.meta
        const condition = error.meta?.where
          ? JSON.stringify(error.meta.where)
          : 'Unknown condition';
        message = `Record not found for the condition: ${condition}.`;
        errors = [
          {
            path: 'unknown',
            message: `No record found for the given condition: ${condition}`,
          },
        ];
        statusCode = 404;
        break;

      default:
        message = 'An unknown database error occurred.';
        break;
    }
  }

  // Handle PrismaClientValidationError
  else if (error instanceof Prisma.PrismaClientValidationError) {
    message = 'Validation Error.';
    errors = [
      {
        path: '',
        message: error.message,
      },
    ];
    statusCode = 400;
  }

  // Return formatted error response
  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleValidationError;
