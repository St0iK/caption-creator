import { Container } from 'typedi';
import { Logger } from 'winston';

const sample = async (req, res, next) => {
  const Logger: Logger = Container.get('logger');
  try {
    Logger.info('🔥 Sample Middleware');
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default sample;
