import express from 'express';
import carRouter from './routes/cars.routes';
import middlewareError from './Middleware/error';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(middlewareError);

export default app;
