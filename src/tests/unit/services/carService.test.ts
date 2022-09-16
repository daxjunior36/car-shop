import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.model';
import { carMock, carMockWithId } from '../../mocks/carMock';
import CarService from '../../../services/Car.service';

const { expect } = chai;

describe('Testando CarService', () => {
  const model = new CarModel();
  const service = new CarService(model);

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

describe('Testando add novo carro', () => {
  it('Success...', async () => {
    const novoCarro = await service.create(carMock);

    expect(novoCarro).to.be.deep.eq(carMockWithId);
  });
})
 
});