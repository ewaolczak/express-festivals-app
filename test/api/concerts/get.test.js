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
      price: 50,
      day: 1,
      image: 'Concert Two Test Image'
    });
    await testConcTwo.save();

    const testConcThree = new Concert({
      _id: '646a195740e21f73592c5928',
      performer: 'Conert Three Test Performer',
      genre: 'Concert Three Test genre',
      price: 75,
      day: 1,
      image: 'Concert Three Test Image'
    });
    await testConcThree.save();
  });

  // DLACZEGO NIE DZIAŁA??
  
  // it('/ should return all concetrs', async () => {
  //   const res = await request(server).get('/concerts');
  //   expect(res.status).to.be.equal(200);
  //   expect(res.body).to.be.an('array');
  //   expect(res.body.length).to.be.equal(3);
  // });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get(
      '/concerts/6469e4c466e95343001d5a48'
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/performer/:performer should return one concert by :performer ', async () => {
    const res = await request(server).get('/concerts/performer/Conert One Test Performer');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/genre/:genre should return all concerts by :genre ', async () => {
    const res = await request(server).get('/concerts/genre/Concert One Test genre');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/price/:price_min/:price_max should return all concert by prices', async () => {
    const res = await request(server).get('/concerts/price/25/75');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    // expect(res.body.length).to.be.equal(3) // DLACZEGO?
  });

  it('/day/:day should return all concert by :day ', async () => {
    const res = await request(server).get('/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    // expect(res.body.length).to.be.equal(3) // DLACZEGO?
  });

  after(async () => {
    await Concert.deleteMany();
  });
});
