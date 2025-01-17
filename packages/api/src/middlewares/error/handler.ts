import { Response } from 'express';
import { ZodError } from 'zod';
import { BadRequest, CustomError } from './error';

async function handler(error: CustomError | Error, res: Response): Promise<Response> {
  if (error instanceof CustomError) {
    return res.status(error.getCode()).json({
      status: error.message ?? 'error',
      message: error.json,
    });
  }

  if (error instanceof ZodError) {
    return handler(new BadRequest(error.message, error.issues), res);
  }

  console.error(error.message);
  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
}

export { handler };
