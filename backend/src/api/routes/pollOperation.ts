import Logger from '../../loaders/logger';
import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/operation', route);

  route.post('/poll', async (req: Request, res: Response, next: any) => {

    try {
      console.log(req.params);
      // this.cache.get(operationId);
      return res.json(true);

    } catch (err) {
      return res.status(400).send(err);
    }

  });
};
