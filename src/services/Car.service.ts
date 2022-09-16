import { isValidObjectId } from 'mongoose';
import { vehicleZodSchema } from '../interfaces/IVehicle';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarService implements IService <ICar> {
  private _car: IModel <ICar>;
  constructor(model: IModel <ICar>) {
    this._car = model;
  }

  async create(obj: unknown): Promise <ICar> {
    const objCar = obj as ICar;
    const car = { doorsQty: objCar.doorsQty, seatsQty: objCar.seatsQty };
    const testCar = carZodSchema.safeParse(car);
    if (!testCar.success) throw testCar.error;

    const vehicle = {
      model: objCar.model,
      year: objCar.year,
      color: objCar.color,
      buyValue: objCar.buyValue,
      status: objCar.status,
    };
    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;

    return this._car.create(objCar);
  }

  public async read(): Promise <ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  async readOne(_id: string): Promise <ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error('Id do service não localizado');
    return car;
  }

  async delete(_id: string): Promise <ICar> {
    if (!isValidObjectId(_id)) { throw new Error('Id invalido no service delete'); }
    const car = await this._car.delete(_id);
    if (!car) throw new Error('Id do service não localizado');
    return car;
  }

  async update(_id: string, obj: ICar): Promise <ICar | null> {
    const car = { doorsQty: obj.doorsQty, seatsQty: obj.seatsQty };
    const testCar = carZodSchema.safeParse(car);
    if (!testCar.success) throw testCar.error;
    const vehicle = {
      model: obj.model,
      year: obj.year,
      color: obj.color,
      buyValue: obj.buyValue,
      status: obj.status,
    };

    const testVehicle = vehicleZodSchema.safeParse(vehicle);
    if (!testVehicle.success) throw testVehicle.error;
  
    await this._car.readOne(_id);
    return this._car.update(_id, obj);
  }
}