import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const adminValid = { email: 'admin@admin.com', password: 'secret_admin' };
const adminNoPwd = { email: 'admin@admin.com', password: '' };
const adminBadPwd = { email: 'admin@admin.com', password: 'secret' };
const adminNoEmail = { email: '', password: 'secret' };

const user = {
  "id": 1,
  "username": "Admin",
  "role": "admin",
  "email": "admin@admin.com",
  "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
};

describe('Endpoint /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(user as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Quando a requisição retorna status 200', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send(adminValid)

      expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Quando a requisição retorna status 400 sem password válida', async () => {
    chaiHttpResponse = await chai.request(app)
     .post('/login')
     .send(adminNoPwd)
    
     expect(chaiHttpResponse.status).to.equal(400);
  });

  it('Quando a requisição retorna status 400 sem email válido', async () => {
    chaiHttpResponse = await chai.request(app)
     .post('/login')
     .send(adminNoEmail)
    
     expect(chaiHttpResponse.status).to.equal(400);
  });

  it('Verificar se retorna 200 com os dados incorretos', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(adminBadPwd)
    
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });
});
