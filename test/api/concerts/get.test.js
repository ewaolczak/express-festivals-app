const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

use.chai(chaiHttp);

const expect = chai.expect;
const request = chai.request;
