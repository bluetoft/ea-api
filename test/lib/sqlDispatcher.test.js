'use strict';
var returnVal = [{"NamedRow": 1}]
var mockRequestModule = {
  input: function(key,val){},
  query: sinon.stub().returns(returnVal)
}
var mockSqlModule = sinon.stub();
var client = proxyquire('../../app/lib/sqlDispatcher', {
  'mssql': mockSqlModule
});


describe('sqlDispatcher', function() {
  describe('query', function() {
    beforeEach(function() {
      mockSqlModule.Connection = sinon.spy(function(config, func){
        setTimeout(func,10);
        return mockSqlModule;
      });
      mockSqlModule.request = sinon.spy(function(){
        return mockRequestModule;
      });
      mockRequestModule.query = sinon.spy(function(stmt,func){
        setTimeout(function(){
          func(undefined,returnVal);
        },20)
      });
    });

    it('returns data from response', function(done) {
      var response = client.query("SELECT 1 as NamedRow", null);
      expect(response).to.eventually.deep.equal(returnVal)
        .and.notify(done);
    });

    it('can accept parameters.', function(done) {
      var params = {"item":1};
      var response = client.query("SELECT @item as NamedRow", params);
      expect(response).to.eventually.deep.equal(returnVal)
        .and.notify(done);
    })

    it('can delete', function(done) {
       var response = client.query('insert into ##gblTempTable values(3,6,\'abcdefg\'); delete from ##gblTempTable');
        expect(response).to.notify(done);
    });

    it('will reject on error', function(done){
      mockRequestModule.query = sinon.spy(function(stmt,func){
        setTimeout(function(){
          func({'message':'kablooie'},undefined);
        },20)
      });
      var response = client.query("SELECT @item as NamedRow");
      expect(response).to.eventually.be.rejected.and.notify(done);
    });
  });
});
