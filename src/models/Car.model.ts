import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseShema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});
// }, { versionkey: false });

export default class Car extends MongoModel<ICar> {
  static read() {
    throw new Error('Method not implemented.');
  }
  constructor(model = mongooseCreateModel('Car', carMongooseShema)) {
    super(model);
  }
}
