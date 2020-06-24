import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();
import { cache } from '../../loaders/lru-cache';

export default (app: Router) => {
  app.use('/operation', route);

  route.get('/poll/:operationId', async (req: Request, res: Response, next: any) => {

    try {
      const { operationId } = req.params
      const operation = cache.get(operationId);
      console.log(operationId);
      console.log(operation);
      return res.json(true);
    } catch (err) {
      return res.status(400).send(err);
    }

  });
};
