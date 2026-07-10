import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (env.AUTH_DISABLED === 'true') {
    return next();
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  next();
}
