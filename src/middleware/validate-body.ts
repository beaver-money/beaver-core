import { NextFunction, Request, Response } from 'express';
import z from 'zod/v4';

export const validateBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map(err => ({
          message: `${err.path.join('.')} ${err.message}`,
        }));
        res.status(400).json({ error: 'Invalid input data', details });
        return;
      }
      next(error);
    }
  };
};