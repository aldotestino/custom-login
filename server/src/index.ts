import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userController from './controllers/userController';
import {  handleError } from './middlewares';
import { User } from '@prisma/client';

const PORT = 3001;

const app = express();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: Partial<User>
    }
  }
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/users', userController);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
