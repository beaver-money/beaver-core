import type { Handler, Request, Response, NextFunction, Router, RequestHandler } from 'express'

/**
 * Wraps an Express Router so any async errors bubble to next().
 */
export function asyncHandler(r: RequestHandler): Handler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise
      .resolve((r as RequestHandler)(req, res, next))
      .catch(next)
  }
}