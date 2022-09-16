import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel <T> implements IModel<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('Erro Read one model');
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Erro update model');

    return this.model.findOneAndUpdate(
      { _id },
      { ...obj } as UpdateQuery <T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Erro delete model');
    return this.model.findOneAndDelete({ _id });
  }
}

export default MongoModel;