import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError';
import { ErrorCodes } from '../utils/types';
import { authenticateUser } from '../middlewares';

const userController = Router();

userController.post('/register', async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword
      }
    });

    res.json({
      success: true,
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          email: user.email
        }
      }
    });

  } catch(e: any) {
    if(e.code === 'P2002') {
      next(new CustomError('Email già in uso', ErrorCodes.EMAIL_IN_USE));
    }else {
      next(new CustomError('Errore del server', ErrorCodes.SERVER_ERROR));
    }
  }
});

userController.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if(!user) {
    next(new CustomError('Email inesistente', ErrorCodes.INVALID_EMAIL));
    return;
  }

  const passwordMacth = await bcrypt.compare(password, user.password);
  if(!passwordMacth) {
    next(new CustomError('Email errata', ErrorCodes.WRONG_PASSWORD));
    return;
  }

  const token = jwt.sign(user.id, process.env.JWT_SECRET!);

  res.cookie('access-token', token);

  res.json({
    success: true,
    data: {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email
      }
    }
  });
});

userController.get('/me', authenticateUser, (req, res, next) => {
  if(req.user) {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  }else {
    next(new CustomError('Utente non loggato', ErrorCodes.UNAUTHORIZED));
  }
});

userController.get('/logout', authenticateUser, (req, res) => {
  res.clearCookie('access-token');
  res.json({
    success: true
  });
});

export default userController;
