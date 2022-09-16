import { Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService <ICar>) {}

  async create(req: Request, res: Response <ICar>) {
    const { 
      model, 
      year, 
      color, 
      status, 
      buyValue, 
      doorsQty,
      seatsQty } = req.body;

    const car = { model,
      year, 
      color, 
      status, 
      buyValue, 
      doorsQty, 
      seatsQty };
      
    const results = await this._service.create(car);
    return res.status(201).json(results);  
  }
}
