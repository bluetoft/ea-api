'use strict';

console.log('*******************')

process.env.NODE_ENV = 'test';
var app = require('../../app');

global.supertest = require('supertest')(app);
global.chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
global.expect = chai.expect;

global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.mockPromises = require('./mockPromises');

global.nock = require('nock');
afterEach(function() {
  nock.cleanAll();
});