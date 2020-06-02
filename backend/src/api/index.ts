import { Router } from 'express';
import sample from './routes/sample';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	sample(app);

	return app
}