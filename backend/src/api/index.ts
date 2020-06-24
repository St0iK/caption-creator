import { Router } from 'express';
import sample from './routes/sample';
import fileUpload from './routes/file-upload';
import pollOperation from './routes/pollOperation';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	sample(app);
	fileUpload(app);
	pollOperation(app);

	return app
}