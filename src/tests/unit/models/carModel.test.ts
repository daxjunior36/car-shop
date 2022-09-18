import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Car.model';
import { carMock, carMockWithId } from '../../mocks/carMock';
// import { ICar } from '../../../interfaces/ICar';

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
   });
 
  });

  describe('Metodo "read"', () => {
    before(() => {
      sinon.stub(Model, 'find')
      .onCall(0).resolves([carMock.validCar])
      .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });
    
    // it('É possivel listar todos os carros com sucesso', async () => {
    //   const result = await CarModel.read();

    //   expect(result).to.be.eqls([carMock.validCar]);
    // });

    // it('Retorna lista vazia caso não haja carros', async() => {
    //   const result = await CarModel.read();

    // expect(result).to.be.eqls([]);
    //  })
  });  


