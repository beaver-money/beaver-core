import userService from '@src/resources/users/service';
import { NextFunction, Request, Response } from 'express';

export const requireSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth0Id = req?.auth?.sub;
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const user = await userService.findById(req.params.id);
    if (user?.auth0Id && auth0Id === user.auth0Id) {
      return next();
    }
    res.status(403).json({ error: "Forbidden" });
    return;
  } catch (err) {
    next(err);
    return;
  }
};