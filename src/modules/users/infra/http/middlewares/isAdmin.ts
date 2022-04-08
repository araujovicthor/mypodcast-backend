import { Response, Request, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { role } = request.user;

  if (role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  return next();
}
