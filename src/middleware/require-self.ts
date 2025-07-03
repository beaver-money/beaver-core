import { User } from '@src/resources/users/types';
import { NextFunction, Request, Response } from 'express';

export const requireSelf = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user && user.id === req.params.id) {
    return next()
  }
  res.status(403).json({ error: "Forbidden" });
}