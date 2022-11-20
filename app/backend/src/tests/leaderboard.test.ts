import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

const teamsResolve = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16}];

const matchesAwayResolve = [
    {
    id: 8,
    homeTeam: 15,
    homeTeamGoals: 0,
    awayTeam: 1,
    awayTeamGoals: 1,
    inProgress: false,
    teamAway: [{teamName: 'Avaí/Kindermann'}]
    }]
    const matchesHomeResolve = [
        {
          id: 8,
          homeTeam: 15,
          homeTeamGoals: 0,
          awayTeam: 1,
          awayTeamGoals: 1,
          inProgress: false,
          teamHome: [{teamName: 'São José-SP'}]
        }]

        
describe('Endpoint /leaderboard', () => {
  beforeEach(() => sinon.restore());

  afterEach(()=> sinon.restore());

  let chaiHttpResponse: Response;

  it('Verificar se retorna status 200 na rota leaderboard/home', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsResolve as Team[])
    sinon.stub(Match, 'findAll').resolves(matchesHomeResolve as unknown as Match[])
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/home')
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Verificar se retorna status 200 na rota leaderboard/away', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsResolve as Team[])
    sinon.stub(Match, 'findAll').resolves(matchesAwayResolve as unknown as Match[])
    chaiHttpResponse = await chai.request(app)
    .get('/leaderboard/away')
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

});