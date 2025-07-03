import { NextFunction, Request, Response } from 'express';

// Assumes req.user.sub is the Auth0 user id (sub), and req.params.id is the local user id
import userService from '@src/resources/users/service';

export const requireSelf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth0Id = (req.user as any)?.sub;
    if (!auth0Id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const user = await userService.findById(req.params.id);
    if (user && user.auth0Id === auth0Id) {
      return next();
    }
    res.status(403).json({ error: "Forbidden" });
    return;
  } catch (err) {
    next(err);
    return;
  }
};