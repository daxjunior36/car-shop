import { Router } from 'express';
import CarController from '../controllers/Car';
import CarService from '../services/Car.service';
import CarModel from '../models/Car.model';
import 'express-async-errors';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;