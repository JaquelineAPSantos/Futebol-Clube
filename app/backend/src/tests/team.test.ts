import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const team = {
    id:1,
    teamName: 'Avaí/Kindermann',
  };

describe('Endpoint /Teams', () => {
  beforeEach(() => {
    sinon.stub(Team, 'findAll').resolves([team as Team]);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Verificar se retorna o status 200', async () => {
    const response = await chai.request(app)
    .get('/teams')
    
    expect(response.status).to.equal(200);
  });

  it('Verificar se retorna Team corretamente', async () => {
    const response = await chai.request(app)
    .get('/teams')
    
    expect(response.body).to.be.deep.equal([team]);
  });
});
