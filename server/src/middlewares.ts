import { Request, Response, NextFunction } from 'express';
import CustomError from './utils/CustomError';
import jwt from 'jsonwebtoken';
import prisma from './lib/prisma';
import { ErrorCodes } from './utils/types';

async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  if(!('access-token' in req.cookies)) {
    next(new CustomError('Autenticazione necessaria', ErrorCodes.UNAUTHORIZED));
  }else {
    const token = req.cookies['access-token'];

    if(token === '') {
      next(new CustomError('Token nullo', ErrorCodes.UNAUTHORIZED));
    }else {
      const id = String(jwt.verify(token, process.env.JWT_SECRET!));

      const user = await prisma.user.findUnique({
        where: {
          id
        },
        select: {
          firstName: true,
          lastName: true,
          id: true,
          email: true
        }
      });

      if(!user) {
        next(new CustomError('Utente inesistente', ErrorCodes.UNAUTHORIZED));
      }else {
        req.user = user;
        next();
      }
    }
  }
}

function handleError(err: CustomError, req: Request, res: Response, next: NextFunction) {
  res.statusCode = err.code;
  res.json({
    success: false,
    data: {
      errorMessage: err.message
    }
  });
}

export {
  authenticateUser,
  handleError
};
