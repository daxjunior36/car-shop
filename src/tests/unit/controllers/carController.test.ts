import * as sinon from 'sinon';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
import { Request, Response } from 'express';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car';


const { expect } = chai;

describe('Testando CarController', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controllers = new CarController(service);
  const req = {} as Request;
  const res = {} as Response;

  before(async () =>{
    sinon.stub(Model, 'create').resolves(carMockWithId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res); 

  });

  after(() => {
    sinon.restore();
  })

  describe('Testando se add novo carro', () => {
    it('Sucess...', async () => {
      req.body = carMock;
      await controllers.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(carMockWithId)).to.be.true;
    });
  })
});