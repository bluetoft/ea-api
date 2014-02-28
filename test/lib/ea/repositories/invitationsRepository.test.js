'use strict';

var mockFunc = sinon.spy();
var repository = proxyquire('../../app/lib/ea/repositories/invitationsRepository',{
	'../../sqlDispatcher': {query:function(done){
			return 	{
				then: mockFunc
			}
		}
	}
})
describe('invitations repository', function(){
	describe('create', function(){
		it('should require an email address and a userId', function(){
			expect(repository.createInvite).to.throw()
		});

		it('should call into query to create the invitation', function() {
			repository.createInvite(1,2);
			expect(mockFunc.calledOnce)
		});
	})

	describe('lookup', function(){

	})

})