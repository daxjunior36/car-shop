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

  async read(req: Request, res: Response <ICar[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }
  async readOne(req: Request, res: Response <ICar>) {
    const results = await this._service.readOne(req.params.id);
    return res.status(200).json(results);
  }
  async update(req: Request, res: Response <ICar | null>) {
    const results = await this._service.update(req.params.id, req.body);
    return res.status(200).json(results);
  }
  async delete(req: Request, res: Response <ICar>) {
    await this._service.delete(req.params.id);
    return res.status(204).end();
  }
}