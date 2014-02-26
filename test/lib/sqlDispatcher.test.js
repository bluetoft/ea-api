'use strict';

describe('sqlDispatcher', function() {

  var client = require('../../app/lib/sqlDispatcher');
  describe('query', function() {
    
    var responseFromServer = [{"NamedRow": 1}];

    describe('when called with execute', function() {
      beforeEach(function() {
       
      });
  
      it('returns data from response', function(done) {
        var response = client.query("SELECT 1 as NamedRow", null);
        expect(response).to.eventually.deep.equal(responseFromServer)
          .and.notify(done);
      });

      it('can accept parameters.', function(done) {
        var params = {"item":1};
        var response = client.query("SELECT @item as NamedRow", params);
        expect(response).to.eventually.deep.equal(responseFromServer)
          .and.notify(done);
      })

      it('can delete', function(done) {
         var response = client.query('insert into ##gblTempTable values(3,6,\'abcdefg\'); delete from ##gblTempTable');
          expect(response).to.notify(done);
      });
    });
    
  });
});
