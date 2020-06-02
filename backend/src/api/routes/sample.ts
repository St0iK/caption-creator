import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/sample', route);
};
