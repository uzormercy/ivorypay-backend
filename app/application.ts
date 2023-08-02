import express, { type Express } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Express = express();
app.use(express.json(), cors());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;
