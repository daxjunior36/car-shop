import express from 'express';
import carRouter from './routes/cars.routes';

const app = express();
app.use(express.json());
app.use(carRouter);

export default app;
