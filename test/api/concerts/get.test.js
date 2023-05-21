const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {
  before(async () => {
    const testConcOne = new Concert({
      _id: '6469e4c466e95343001d5a48',
      performer: 'Conert One Test Performer',
      genre: 'Concert One Test genre',
      price: 25,
      day: 1,
      image: 'Concert One Test Image'
    });
    await testConcOne.save();

    const testConcTwo = new Concert({
      _id: '646a0e44e43932ca7e3ae325',
      performer: 'Conert Two Test Performer',
      genre: 'Concert Two Test genre',
      price: 25,
      day: 1,
      image: 'Concert Two Test Image'
    });
    await testConcTwo.save();

    const testConcThree = new Concert({
      _id: '646a195740e21f73592c5928',
      performer: 'Conert Three Test Performer',
      genre: 'Concert Three Test genre',
      price: 25,
      day: 1,
      image: 'Concert Three Test Image'
    });
    await testConcThree.save();
  });

  it('/ should return all concetrs', async () => {
    const res = await request(server).get('/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
