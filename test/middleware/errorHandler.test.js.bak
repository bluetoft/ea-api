'use strict';

var err = new Error();
var req = {};
var res = {};
var mockedUuidResponse;
var mockUuid;
var errorHandler;
var expectedResponse = {};

describe('errorHandler', function() {
  beforeEach(function(){
    err = new Error();
    err.message = 'Foo Message';
    err.status = 999;
    err.code = 123;
    err.tracking = '12345';
    err.friendlyMessage = 'Friendly Message';
    
    expectedResponse.status = err.status || 500;
    expectedResponse.code = err.code;
    expectedResponse.message = err.friendlyMessage;
    expectedResponse.developerMessage = err.message;
    expectedResponse.tracking = err.tracking;
    expectedResponse.stack = err.stack;
    res = { json: sinon.spy() };
    mockedUuidResponse = 1234;
    mockUuid = sinon.stub({ v1: function(){} });
    mockUuid.v1.returns(mockedUuidResponse);
    errorHandler = proxyquire('../../app/middleware/errorHandler', {'node-uuid' : mockUuid  });
  });

  it('exists', function() {
    expect(errorHandler).to.not.equal(undefined);
  });

  describe('when called with bad data', function(){
    it('returns undefined when error is null', function() {
      var response = errorHandler(null, req, res);
      expect(response).to.equal(undefined);
    });

    it('returns undefined when error is undefined', function() {
      var response = errorHandler(undefined, req, res);
      expect(response).to.be.equal(undefined);
    });
  });

  describe('When called with an error', function() {

    it('calls res.json with the new errorResponse and error status', function() {
      errorHandler(err, req, res);
      expect(res.json).to.have.been.calledWith(expectedResponse, expectedResponse.status);
    });

    it('calls res.json with the new errorResponse and 500 status if no status is set', function() {
      err.status = undefined;
      errorHandler(err, req, res);
      expect(res.json.args[0][1]).to.equal(500);
    });

    it('calls res.json with the new errorResponse should have the  property status with 500 value', function() {
      err.status = undefined;
      errorHandler(err, req, res);
      expect(res.json.args[0][0]).to.have.property('status', 500);
    });

    it('maps the error properties correctly when they are populated.', function() {
      errorHandler(err, req, res);
      expect(res.json.args[0][0]).to.have.property('status').and.to.equal(err.status);
      expect(res.json.args[0][0]).to.have.property('code').and.to.equal(err.code);
      expect(res.json.args[0][0]).to.have.property('message').and.to.equal(err.friendlyMessage);
     
      expect(res.json.args[0][0]).to.have.property('developerMessage').and.to.equal(err.message);
      expect(res.json.args[0][0]).to.have.property('tracking').and.to.equal(err.tracking);
    });

    it('maps the error properties correctly when they are undefined.', function() {
      errorHandler(new Error(), req, res);
      expect(res.json.args[0][0]).to.have.property('status').and.to.equal(500);
      expect(res.json.args[0][0]).to.have.property('code').and.to.equal(500);
      expect(res.json.args[0][0]).to.have.property('message').and.to.equal('Server error occurred.');
      expect(res.json.args[0][0]).to.have.property('developerMessage').and.to.equal('Undefined server error.');
      expect(res.json.args[0][0]).to.have.property('tracking').and.to.equal(mockedUuidResponse);
    });

  });
});