'use strict'

describe('sessionHandler', function() {
	var proxyRepo;
	beforeEach(function(){
		proxyRepo = { then:function(method) {method();}	};
	})
	var sessionHandler = proxyquire('../../app/middleware/sessionHandler', {
		'../lib/ea/repositories/sessionsRepository': {
			getSession: function(obj){
				return proxyRepo;
			}
		}
	})
	
	it('should read an incoming session from the header', function(){
		var spy = sinon.spy();
		var req = {
			headers: {
				'auth-s':'a'
			}
		}
		sessionHandler(req,{},spy)
		expect(spy.calledOnce)
	})

	it('should not lookup an empty sessionId', function(){
		var spy = sinon.spy();
		proxyRepo = { then: sinon.spy()};
		var req = {
			headers: {
				'auth-s':''
			}
		}
		sessionHandler(req,{},spy)
		expect(proxyRepo.then.calledOnce).to.be.false
	})
})