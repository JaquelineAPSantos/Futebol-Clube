import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint /matches', () => {
  beforeEach(() => sinon.restore());

  afterEach(()=>sinon.restore());
  
  let chaiHttpResponse: Response;

  it('Verificar se retorna o status 200', async () => {
    sinon.stub(Match, 'findAll').resolves()
    chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna o status 200 com os dados corretos', async () => {
    sinon.stub(Match, 'create').resolves()
    chaiHttpResponse = await chai.request(app).get('/matches');
    
    expect(chaiHttpResponse.status).to.equal(200);
  });
});