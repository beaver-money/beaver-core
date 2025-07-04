import type { ErrorRequestHandler } from 'express'

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      error: err.message || 'Woops, Internal Server Error',
    })
}
