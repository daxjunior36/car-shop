// template para criação dos testes de cobertura da camada de model
import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.model';
import { carMock, carMockWithId } from '../../mocks/carMock';

const { expect } = chai;

describe('Testando CarModel', () => {
  const model = new CarModel();

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
    const novoCarro = await model.create(carMock);

    expect(novoCarro).to.be.deep.eq(carMockWithId);
  });
})
 
});