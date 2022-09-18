import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
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
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this.model.findOne({ _id });
  }

  public async update(_id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery <T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this.model.findOneAndDelete({ _id });
  }
}

export default MongoModel;