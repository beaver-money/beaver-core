import { Request, Response, NextFunction } from 'express';

export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
    res.status(401).json({ error: 'Invalid or missing API key' });
    return;
  }
  next();
}
